import express from 'express'
import DiscordClient from "../services/DiscordClient";
import Database from "../services/Database";
import bodyParser from 'body-parser'
import sha1 from 'sha1';
import session from 'express-session'
import generator from 'generate-password'
const app = express();
const port = 8080;
let client = new DiscordClient('NTg1NzIyNjAyOTAzOTYxNjEw.XRSObA.BYL29cgdeszAgrVmYF3rdDwmYXk');
let guildArray = client.guilds.array();
let db = new Database();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'ilovejs'}));


client.on('guildCreate', async guild => {
    guildArray.push(guild);
    let members = guild.members;
    let owner = guild.ownerID;
    let generatedPassword = generator.generate({
        length: 10,
        numbers: true
    });
    let pwd = sha1(generatedPassword);
    let insertUser = "INSERT INTO members VALUES ('"+ owner + "', '" + pwd + "')";

    try{
        await db.query(insertUser);
    }catch (e) {
        console.log(e);
    }

    members.tap(member => {
        if (member.id === owner) {
            member.send('Identifiant : ' + owner + '\nMot de passe : ' + generatedPassword);
            member.send('Identifiant : ' + owner + '\nMot de passe : ' + generatedPassword);
        }
    });
});

client.on('guildDelete', async guild => {
    guildArray.pop();
    let owner = guild.ownerID;
    let deleteUser = "DELETE FROM members WHERE id_discord = '" + owner + "'";
    try{
        db.query(deleteUser);
    } catch(e) {
        console.log(e);
    }
});

app.get('/home', (req, res) => {

    let inviteLink = "https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot";

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
    let userExists = "SELECT * FROM members WHERE id_discord = '" + login + "'";
    let checkPwd = "SELECT pwd FROM members WHERE id_discord = '" + login + "'";

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
            res.redirect('admin');
        } else {
            res.redirect('home');
        }
    }
});

app.get('/bot-configuration', (req, res) => {

    res.send("Hello");

});

app.get('/admin', (req, res) => {
    res.send('Cool');
});

app.listen(port);

client.destroy();
