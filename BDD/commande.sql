create table ref_roles (
    nom varchar unique NOT NULL,
    num integer unique NOT NULL,
    primary key(nom, num)
);

create table serveurs (
    ID  SERIAL PRIMARY KEY,
    nom varchar unique not null,
    id_discord varchar not null -- id du serveur (dans discord)
);

create table salons (
    id_discord varchar unique not null,
    nom varchar unique not null,
    id_serveur integer references serveurs(id) -- id du serveur en local
);

create table categories (
    id_discord varchar unique not null,
    nom varchar unique not null,
    id_serveur integer references serveurs(id) -- id du serveur en local
);

create table roles (
    id_user_discord  varchar unique not null, -- id utilisateur discord
    id_serveur integer references serveurs(id),
    nom varchar not null references ref_roles(nom),
    num integer not null references ref_roles(num),
    primary key(id_user_discord, id_serveur)
);

create table commandes (
    nom varchar unique,
    niveau_autorite integer check (niveau_autorite>0 and niveau_autorite<11),
    primary key(nom)
);

create table sanctions (
    id  SERIAL PRIMARY KEY,
    id_serveur integer references serveurs(id) ,
    id_moderateur_discord varchar references roles(id_user_discord) ,
    id_user_discord varchar not null,
    id_salon_discord varchar references salons(id_discord),
    id_categorie_discord varchar references categories(id_discord),
    commande varchar references commandes(nom),
    date_debut timestamp not null,
    date_fin timestamp,
    raison varchar(120)
);


