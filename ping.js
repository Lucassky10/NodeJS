"use strict";


(function () {
    import W3CWebSocket from 'websocket';
    import request from 'request';
    // Discord Bot Token here
    const BOT_TOKEN = "NTg1NzIyNjAyOTAzOTYxNjEw.XRiQlw.JZhF1l04zAslBTfMEaQpANxsEpE";
    
    // Discord Gateway url
    const GATEWAY_URL = "wss://gateway.discord.gg/?v=6&encoding=json";
    
    // Websocket object

    W3CWebSocket = W3CWebSocket.w3cwebsocket;

    const API_ENDPOINT_CHANNEL = "https://discordapp.com/api/channels/585723927087546370/messages";

    var client = new W3CWebSocket(GATEWAY_URL);
    var heartbeat_interval = null;


    client.onerror = function() {
        console.log('Connection Error');
    };

    client.onopen = function() {
        doLogin();
    };

    function doLogin() {
        console.log("login");

        let payload = JSON.stringify({
            "op": 2,
            "d" : {
                "token": BOT_TOKEN,
                "properties": {
                    "$os": "linux",
                    "$browser": "my_library",
                    "$device": "my_library"
                }
            }
        });

        if (client.readyState === client.OPEN) {
            client.send(payload);
        }
    }

    client.onclose = function() {
    };

    client.onmessage = function(e) {
        let answer = JSON.parse(e.data);
        let heartbeat = {
                "op": 1,
                "d": null
        };

        console.log(answer);

        if(answer.op === 10 && answer.session_id !== undefined){
            if(answer.d.heartbeat_interval !== undefined){
                console.log("heartbeat");
                heartbeat_interval = answer.d.heartbeat_interval;
                if(heartbeat_interval !== null){
                    setInterval(() => {
                        client.send(JSON.stringify(heartbeat));
                    }, heartbeat_interval);
                    doLogin();
                }
            }
        }

        if(answer.t === "MESSAGE_CREATE"){
            if(answer.d.content === "Ping!"){
                sendPong();
            }
        }

        function sendPong(){

            let headers = {
                "Authorization" : "Bot " + BOT_TOKEN,
                "User-Agent" : "NodeProject (https://someurl, v0.1)",
                "content-type" : "application/json"
            };
            let options = {
                url: API_ENDPOINT_CHANNEL,
                method: 'POST',
                headers: headers,
                body: JSON.stringify({"content": "Pong!"})
            };

            request(options, (err, ans) => {
                console.log(ans);
            })
        }
    };

})();
