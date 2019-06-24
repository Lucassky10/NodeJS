'use strict';

import DiscordClient from "./services/DiscordClient"
import Database from "./services/Database"
import CommandsHandler from "./services/CommandsHandler"

let client = new DiscordClient("NTg1NzIyNjAyOTAzOTYxNjEw.XRB9qQ.FqL0YW54h2nerRxFpo7nmzUqSz0");

client.on('message', async (msg) => {

    let cmd = new CommandsHandler(msg);

    if (cmd.isCommand()) {

        let db = new Database();
        let id_serveur = null;

        let result = db.query('Select id from serveurs where id_discord=$1', cmd.getDiscordServerId());

        id_serveur = result[0].id;
        console.log(id_serveur);


        para = [id_serveur, cmd.getAuthorId()];
        result = await db.query('Select num from roles where id_serveur=$1 and id_user_discord=$2', para);

        if (result.rowcount !== 'undefined') {
            let modo_auto = result.rows[0].num; // Niveau d'autorité du modo

            switch (cmd.split()[0]) {
                case '!ban':
                    para = ['ban'];
                    queryText = 'Select niveau_autorite as num from commandes where nom=$1';
                    result = await db.query(queryText, para);
                    let ban_auto = result.rows[0].num;

                    if (modo_auto <= ban_auto) {

                    }
            }
        }
    }
});
