'use strict';

import DiscordClient from "./services/DiscordClient"
import Database from "./services/Database"
import CommandsHandler from "./services/CommandsHandler"
import moment from 'moment'

let client = new DiscordClient("NTg1NzIyNjAyOTAzOTYxNjEw.XRSObA.BYL29cgdeszAgrVmYF3rdDwmYXk");

let db = new Database();

try {
    client.on('message', async (msg) => {

        let cmd = new CommandsHandler(msg);


        if (cmd.isCommand()) {

            let guild = cmd.getGuild();
            let nomguild=cmd.getGuild().name;

            let id_serveur_discord = cmd.getDiscordServerId();

            let id_modo = cmd.getAuthorId();

            let id_serveur = null;

            let para = [id_serveur_discord];


            let result = await db.query('Select id from serveurs where id_discord=$1', para);

            id_serveur = result.rows[0].id;

            para = [id_serveur, id_modo];
            result = await db.query('Select num from roles where id_serveur=$1 and id_user_discord=$2', para);

            if (result.rowCount > 0) {
                let modo_auto = result.rows[0].num; // Niveau d'autorité du modo

                let cdmsplit = cmd.split();
                //console.log(cdmsplit);
                para = [cdmsplit[0].substr(1)];
                result = await db.query('Select niveau_autorite as num from commandes where nom=$1 and disponible = true', para);
                console.log(result);
                if (result.rowCount > 0) {
                    let cmd_auto = result.rows[0].num;

                    switch (cdmsplit[0]) {
                        case '!ban':
                            para = ['ban'];


                            if (modo_auto <= cmd_auto) {
                                let member = cmd.getGuildMember();
                                let avert = await cmd.get1stMentioned().send('Votre comportement n\'est pas adapté, vous êtes banni de ' + nomguild  + ' pour la raison suivante : ' + cmd.split()[3] + ', pour une durée de ' + cmd.split()[2] + ' jours');

                                member.ban({reason: cmd.split()[3]});

                                para = [id_serveur, id_modo, member.id, 'ban', moment().format('YYYY-MM-DD HH:mm:ss'), moment().add(cmd.split()[2], 'days').format('YYYY-MM-DD  HH:mm:ss'), cmd.split()[3]];
                                result = await db.query('insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut, date_fin,raison) values ($1, $2, $3, $4, $5,$6,$7)', para);

                            }
                            break;

                        case '!kick':
                            para = ['kick'];

                            if (modo_auto <= cmd_auto) {
                                let member = cmd.getGuildMember();
                                let trest=cmd.get1stMentioned();
                                console.log(trest);
                                let avert = cmd.get1stMentioned().send('Votre comportement n\'est pas adapté, vous êtes exclu de ' + nomguild  + ' pour la raison suivante : ' + cmd.split()[2]);

                                member.kick(cmd.split()[3]);
                                para = [id_serveur, id_modo, member.id, 'kick', moment().format('YYYY-MM-DD HH:mm:ss'), cmd.split()[2]];
                                result = await db.query('insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut,raison) values ($1, $2, $3, $4, $5,$6)', para);

                            }
                            break;

                        case '!mute':
                            para = ['mute'];
                            if (modo_auto <= cmd_auto) {
                                let member = cmd.getGuildMember();

                                let mute = null;
                                guild.roles.tap(roles => {
                                    if (roles.name === 'Mute') {
                                        (mute = roles.id)
                                    }
                                });
                                let retour = member.addRole(mute, cmd.split()[3]);

                                para = [id_serveur, id_modo, member.id, 'mute', moment().format('YYYY-MM-DD HH:mm:ss'), moment().add(cmd.split()[2], 'days').format('YYYY-MM-DD  HH:mm:ss'), cmd.split()[3]];
                                retour = await db.query('insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut, date_fin,raison) values ($1, $2, $3, $4, $5,$6,$7)', para);

                            }
                            break;

                        case '!rankup':
                            para = ['rankup'];

                            if (modo_auto <= cmd_auto) {
                                let member = cmd.getGuildMember();

                                let newrole = null;
                                guild.roles.tap(roles => {
                                    if (roles.name === cmd.split()[2]) {
                                        (newrole = roles.id)
                                    }
                                });
                                if (newrole != null) {
                                    let retour = member.addRole(newrole, cmd.split()[3]);

                                    let reply = cmd.msg.reply('Le role ' + cmd.split()[2] + ' a bien été ajouté à ' + cmd.msg.mentions.users.first().username);
                                } else {
                                    let reply = cmd.msg.reply('Le role ' + cmd.split()[2] + ' n\'existe pas');
                                }


                            }
                            break;

                        case '!rankdown':
                            para = ['rankdown'];
                            if (modo_auto <= cmd_auto) {
                                let member = cmd.getGuildMember();

                                let newrole = null;
                                member.roles.tap(roles => {
                                    if (roles.name === cmd.split()[2]) {
                                        (newrole = roles.id)
                                    }
                                });
                                if (newrole != null) {
                                    let retour = member.removeRole(newrole, cmd.split()[3]);

                                    let reply = cmd.msg.reply('Le role ' + cmd.split()[2] + ' a bien été enlevé à ' + cmd.get1stMentioned().username);
                                } else {
                                    let reply = cmd.msg.reply( cmd.get1stMentioned().username + ' Ne posséde pas le role ' + cmd.split()[2]);
                                }


                            }
                            break;
                        case '!warn':
                            para = ['warn'];
                            if (modo_auto <= cmd_auto) {
                                let member = cmd.getGuildMember();
                                let avert = cmd.get1stMentioned().send('Attention votre comportement n\'est pas adapté, vous recevez un avertissement pour la raison suivante : ' + cmd.split()[2]);
                                para = [id_serveur, id_modo, member.id, 'warn', moment().format('YYYY-MM-DD HH:mm:ss'), cmd.split()[2]];
                                result = await db.query('insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut,raison) values ($1, $2, $3, $4, $5,$6)', para);

                            }
                            break;


                        default:
                            let reply = cmd.msg.reply('La commande ' + cdmsplit[0] + ' n\'existe pas, commandes disponibles : !ban, !kick, !mute, !rankup, !rankdown, !warn' );
                            break;

                    }

                }else {
                    let reply = cmd.msg.reply('La commande ' + cdmsplit[0] + ' n\'existe pas, commandes disponibles : !ban, !kick, !mute, !rankup, !rankdown, !warn' );
                }

            }


        }
    })}
catch(err)
{
    console.log(err);
};

client.destroy();