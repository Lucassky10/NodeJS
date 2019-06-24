var pg = require("pg")
var connectionString = "pg://postgres:postgres@localhost:5432/Discord";
var client = new pg.Client(connectionString);
client.connect();

 var queryString = "Select distinct s1.id_user_discord,s1.id_serveur,s1.date_debut, s1.commande, s2.id_serveur as serveur2,s2.date_debut as date_debut2, s2.commande as commande2 from sanctions s1,sanctions s2 where s1.id_user_discord=s2.id_user_discord and (s1.date_debut<=s2.date_debut + INTERVAL '15 day'or s1.date_debut<=s2.date_debut - INTERVAL '15 day') and s1.id_serveur<s2.id_serveur;"
// var query = client.query(queryString);


/*
var query = client.query(queryString)
    .then(result => console.log(result))
    .catch(e => console.error(e.stack))
    .then(() => client.end())

*/

var query = client.query(queryString)
    .then(result => console.log(result.rows))
    .catch(e => console.error(e.stack))
    .then(() => client.end());


