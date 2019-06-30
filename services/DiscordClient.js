'use strict';

import Discord from 'discord.js'

export default class DiscordClient {

    constructor() {
        const client = new Discord.Client();
        client.login("NTg1NzIyNjAyOTAzOTYxNjEw.XRSObA.BYL29cgdeszAgrVmYF3rdDwmYXk");
        return client;
    }

};


