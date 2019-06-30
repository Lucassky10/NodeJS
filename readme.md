# Projet Web - Bot de modération

## Getting started

Cloner le dossier localement : ```git clone https://github.com/Lucassky10/NodeJS.git```

Ramener les dépendances : ```npm install```

Afin de pouvoir utiliser le bot il faut créer la base de données avec le script `nouvelle_base.sql`

Pour se connecter à la base il faut modifier le fichier `Database.js` de cette façon : 
```this.url = "pg://<User>:<Password>@localhost:5432/<nom_de_la_base>";```

Pour tester le bot, vous pouvez rejoindre notre serveur : https://discord.gg/WM4gUAH


## Inserez votre utilisateur dans la base afin d'avoir accès aux commandes de modération :

```insert into roles (id_user_discord, id_serveur, nom, num) values ('{votreiddiscord}' ,2, 'admin', 1);```


Vous pouvez maintenant tester les commandes !!

## Démarrage du serveur

```npm run wonderful-bot```

Attention : cette commande est un alias qui comprend la commande ```pkill node```. Cette commande est un appel système qui ne fonctionne que sous Linux. Elle permet d'éviter d'avoir plusieurs processus node qui tournent en même temps.


## Les possibilités du bot

Il existe 6 commandes disponibles pour notre bot, que nous pouvons gérer avec notre panneau d'administration.

Chaque commande doit être précédée d'un "!".

1. ```!warn @user [raison]``` -> Envoie un message privé à l'utilisateur pour l'avertir et insère dans la base qu'un avertissement a eu lieu.

2. ```!ban @user [durée] [Raison]``` -> Bannit l'utilisateur mentionné du serveur, lui envoie un message pour lui dire et insère dans la base de données tous les détails de la sanction avec la date de fin.

3. ```!kick @user [Raison]``` -> Exclut l'utilisateur mentionné du serveur, lui envoie un message pour lui dire et insère dans la base de données tous les détails de la sanction.

4. ```!mute @user [Raison]```-> Ajoute le rôle mute à l'utilisateur et insère dans la base de données.

5. ```!rankup @user [Role]``` -> Ajoute le rôle à l'utilisateur.

6. ```!rankdown @user [Role]``` -> Retire le rôle à l'utilisateur.
