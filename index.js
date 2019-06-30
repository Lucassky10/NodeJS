'use strict';

import PanelEvents from './services/PanelEvents';
import express from 'express';
import Database from "./services/Database";
import bodyParser from 'body-parser';
import sha1 from 'sha1';
import session from 'express-session';
import Bot from "./services/Bot";
import DiscordClient from './services/DiscordClient';
const app = express();

let db = new Database();

let client = new DiscordClient();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'ilovejs'}));

app.listen(8080);

// admin panel
new PanelEvents();


// bot de modération
new Bot();



app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {

    let inviteLink = "https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=2146958847";

    console.log(req.session.login);
    console.log(req.session.password);

    if(req.session.login !== undefined){ // si connecté
        res.render('pages/index', { link : inviteLink, isConnected: true });
    } else if(req.session.login === undefined){
        res.render('pages/index', { link : inviteLink, isConnected: false });
    }

});

app.post('/home', async (req, res) => {

    let login = req.body.id;
    let pwd = req.body.pwd;
    let userExists = "SELECT * FROM membres WHERE id_discord = '" + login + "'";
    let checkPwd = "SELECT pwd FROM membres WHERE id_discord = '" + login + "'";

    try {
        userExists = await db.query(userExists);
    } catch (e) {
        console.log(e);
    }

    if(userExists.rowCount === 1) {
        try {
            checkPwd = await db.query(checkPwd);
        } catch(e) {
            console.log(e);
        }

        if(checkPwd.rows[0].pwd === sha1(pwd)){
            req.session.login = login;
            req.session.password = pwd;
            res.redirect('/admin');
        } else {
            res.redirect('/home');
        }
    }
});

app.get('/admin', (req, res) => {
    res.render('pages/admin', { urlIsCommands : false });
});

app.get('/commands', async (req, res) => {

    let commands = "SELECT * FROM Commandes";
    commands = await db.query(commands);
    let commandsAvailable = null;
    let noCommands = false;
    if(commands.rowCount !== 0) {

        commandsAvailable = commands;

    } else {
         noCommands = true;
    }

    res.render('pages/admin', { urlIsCommands : true, commands : commandsAvailable, noCommands: noCommands });

});

app.get('/delete-command/:nom', async (req, res) => {


    let deleteCommand = "UPDATE Commandes SET disponible = false WHERE nom = '" + req.params.nom + "'";
    await db.query(deleteCommand);
    res.redirect('/commands');

});

app.get('/add-command/:nom', async (req, res) => {

   let updateCommand = "UPDATE Commandes SET disponible = true WHERE nom = '" + req.params.nom + "'";
   await db.query(updateCommand);

    res.redirect('/commands');
});