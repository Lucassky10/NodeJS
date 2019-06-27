const Discord = require('discord.js');
const client = new Discord.Client();

var pg = require("pg");
var connectionString = "pg://postgres:postgres@localhost:5432/Discord";
var db = new pg.Client(connectionString);
db.connect();


//var queryString= ('Select id from serveurs');
// var query = db.query(queryString)
//     .then(result => console.log(result.rows[0].id))
//     .catch(e => console.error(e.stack));

console.log(new Date().getFullYear() +"/" + new Date().  + "/" + new Date().getDate());


const BOT_TOKEN = "NTg1NzIyNjAyOTAzOTYxNjEw.XQ5f0Q.QkXb5YP6gw2j5WqNUf2sSD-c0ro";



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (msg.content.charAt(0) === '!') {
        let cmd = msg.content.split(' ');
        let guild = msg.guild;
        let id_serveur_discord = msg.guild.id;
        let id_modo = msg.author.id;
        let id_serveur = null;

        let para = [id_serveur_discord];
        let queryText = 'Select id from serveurs where id_discord=$1';
        let result = await db.query(queryText, para);

        id_serveur = result.rows[0].id;
        console.log(id_serveur);

        para = [id_serveur, id_modo];
        queryText = 'Select num from roles where id_serveur=$1 and id_user_discord=$2';
        result = await db.query(queryText, para);

        if (result.rowcount!== 'undefined') {
            let modo_auto= result.rows[0].num; // Niveau d'autorité du modo

            switch (cmd[0]) {
                case '!ban':
                    para = ['ban'];
                    queryText = 'Select niveau_autorite as num from commandes where nom=$1';
                    result = await db.query(queryText, para);
                    let ban_auto= result.rows[0].num;

                    if (modo_auto<=ban_auto){
                        let member = msg.guild.member(msg.mentions.users.first());
                        //member.ban({reason: cmd[2]});
                        para = [id_serveur,id_modo,member.user.id,'ban', new Date().getDate(),  new Date().getDate() ,cmd[2]];
                        console.log(para)
                        //queryText = 'insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut, date_fin,raison) values ($1, $2, $3, $4, $5,$6,$7)';
                        result = await db.query(queryText, para);
                    }



            }

        };


    }


})

client.login(BOT_TOKEN);