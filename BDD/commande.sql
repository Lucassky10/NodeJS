create table ref_roles (
    nom varchar unique NOT NULL,
    num integer unique NOT NULL,
    primary key(nom, num)
);

create table serveurs (
    ID  SERIAL PRIMARY KEY,
    nom varchar unique not null,
    id_discord varchar(60) not null -- id du serveur (dans discord)
);

create table salons (
    id_discord  varchar(60) unique not null,
    nom varchar unique not null,
    id_serveur integer references serveurs(id) -- id du serveur en local
);


create table categories (
    id_discord  varchar(60) unique not null,
    nom varchar unique not null,
    id_serveur integer references serveurs(id) -- id du serveur en local
);

create table roles (
    id_user_discord  varchar unique not null, -- id utilisateur discord
    id_serveur integer references serveurs(id) ,
    nom varchar not null references ref_roles(nom),
    num integer not null references ref_roles(num),
    primary key(id_user_discord, id_serveur)

);

create table commandes (
    id  SERIAL PRIMARY KEY,
    nom varchar unique,
    niveau_autorite integer check (niveau_autorite>0 and niveau_autorite<11)
);

create table sanctions (
    id  SERIAL PRIMARY KEY,
    id_serveur integer references serveurs(id) ,
    id_moderateur_discord varchar references roles(id_user_discord) ,
    id_user_discord varchar not null,
    id_salon_discord varchar references salons(id_discord),
    id_categorie_discord varchar references categories(id_discord),
    commande varchar references commandes(nom),
    date_debut date not null,
    date_fin date,
    raison varchar(120)
);

 -- données fake pour tester table serveurs
insert into serveurs (nom, id_discord) values ('wazoo', '12435');
insert into serveurs (nom, id_discord) values ('ouloulou', '3245');
insert into serveurs (nom, id_discord) values ('akiaki', '4563');
insert into serveurs (nom, id_discord) values ('pneu', '1212');

 -- données fake pour tester table ref_roles

insert into ref_roles values ('admin', 1);
insert into ref_roles values ('moderateur', 3);
insert into ref_roles values ('neutre', 5);

 -- données fake pour tester roles

insert into roles (id_user_discord, id_serveur, nom, num) values (134 ,1, 'admin', 1);
insert into roles (id_user_discord, id_serveur, nom, num) values (120 ,1, 'moderateur', 3);
insert into roles (id_user_discord, id_serveur, nom, num) values (125 ,1, 'neutre', 5);

insert into roles (id_user_discord, id_serveur, nom, num) values (122, 2, 'admin', 1);
insert into roles (id_user_discord, id_serveur, nom, num) values (135, 2, 'moderateur', 3);
insert into roles (id_user_discord, id_serveur, nom, num) values (127, 2, 'neutre', 3);

insert into roles (id_user_discord, id_serveur, nom, num) values (123, 3, 'admin', 1);
insert into roles (id_user_discord, id_serveur, nom, num) values (136, 3, 'moderateur', 3);
insert into roles (id_user_discord, id_serveur, nom, num) values (129, 3, 'neutre', 3);

-- données fake pour tester commandes

insert into commandes (nom, niveau_autorite) values ('ban', 1);
insert into commandes (nom, niveau_autorite) values ('mute', 2);

-- données fake pour tester sanctions

insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut,date_fin)
values (1, 134, 120, 'ban', '2019-09-10','2019-10-03');

insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut, date_fin)
values (2, 135, 122, 'mute', '2019-06-12','2019-07-17');

insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut, date_fin)
values (3, 136, 123, 'ban', '2019-08-03','2019-10-13');
