'use strict';

import Discord from 'discord.js'

export default class DiscordClient {

    constructor(bot_token) {
        const client = new Discord.Client();
        client.login(bot_token);
        console.log("ready");
        return client;
    }

};


