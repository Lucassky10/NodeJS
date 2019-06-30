Base de données :
Afin de pouvoir utiliser le bot il faut créer la base de données avec le script "creation_base.sql"

Pour se connecter à la base il faut modifier le fichier Database.js avec notre utilisateur de la base de données
this.url = "pg://User:Password@localhost:5432/Discord";


Rejoignez notre serveur via ce lien https://discord.gg/WM4gUAH)


Inserer votre utilisateur dans la base afin d'avoir accès aux commandes de modération :

insert into roles (id_user_discord, id_serveur, nom, num) values ('{votreiddiscord}' ,2, 'admin', 1);


Vous pouvez maintenant tester les commandes


Les possibilités du bot :

Il existe 6 commandes disponibles pour notre bot, que nous pouvons gérer avec notre panneau d'administration

Chaque commande doit être précédé d'un "!" en 1er caractère,

!warn @user [raison]
Envoie un message privé à l'utilisateur pour l'avertir et insert dans la base qu'un avertissement a eu lieu

!ban @user [durée] [Raison]
Qui bannit l'utilisateur mentionné du serveur, lui envoie un message pour lui dire et insert dans la base de données tous les détails de la sanction avec la date de fin

!kick @user [Raison]
Qui exclu l'utilisateur mentionné du serveur, lui envoie un message pour lui dire et insert dans la base de données tous les détails de la sanction

!mute @user [Raison]
Met le role mute à l'utilisateur et isnert dans la Base

!rankup @user [Role]
Ajoute le rôle à l'utilisateur

!rankdown @user [Role]
Retire le rôle à l'utilisateur
