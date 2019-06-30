create table ref_roles (
    nom varchar NOT NULL,
    num integer NOT NULL,
    primary key(nom, num)
);

create table serveurs (
    ID  SERIAL PRIMARY KEY,
    nom varchar not null,
    id_discord varchar not null -- id du serveur (dans discord)
);

create table salons (
    nom varchar not null,
    id_discord  varchar unique not null,
    id_serveur integer references serveurs(id) -- id du serveur en local
);


create table categories (
    nom varchar not null,
    id_discord  varchar unique not null,
    id_serveur integer references serveurs(id) -- id du serveur en local
);

create table roles (
    id_user_discord  varchar not null, -- id utilisateur discord
    id_serveur integer references serveurs(id) ,
    nom varchar not null ,
    num integer not null,
    primary key(id_user_discord, id_serveur),
    FOREIGN KEY (nom,num) REFERENCES ref_roles(nom,num)


);

create table commandes (
    nom varchar PRIMARY KEY,
    niveau_autorite integer check (niveau_autorite>0 and niveau_autorite<11),
    disponible boolean
);

create table sanctions (
    id  SERIAL PRIMARY KEY,
    id_serveur integer,
    id_moderateur_discord varchar,
    id_user_discord varchar not null,
    id_salon_discord varchar references salons(id_discord),
    id_categorie_discord varchar references categories(id_discord),
    commande varchar references commandes(nom),
    date_debut timestamp not null,
    date_fin timestamp,
    raison varchar(120),
    FOREIGN KEY (id_serveur,id_moderateur_discord) REFERENCES roles(id_serveur,id_user_discord)
);

 -- données table serveurs
insert into serveurs (nom, id_discord) values ('Alien', '588356321661943808');
insert into serveurs (nom, id_discord) values ('Node', '585723927087546368');
insert into serveurs (nom, id_discord) values ('Smoke', '588356610305294356');



insert into categories (nom, id_discord, id_serveur) values ('Salons textuels', '588356321661943809',1);
insert into categories (nom, id_discord, id_serveur) values ('Salons vocaux', '588356321661943811',1);
insert into categories (nom, id_discord, id_serveur) values ('Star wars', '588357851135868931',1);

insert into categories (nom, id_discord, id_serveur) values ('Salons textuels', '585723927087546369',2);
insert into categories (nom, id_discord, id_serveur) values ('Salons vocaux', '585723927087546371',2);
insert into categories (nom, id_discord, id_serveur) values ('JS', '588358926685437953',2);

insert into categories (nom, id_discord, id_serveur) values ('Salons textuels', '588356610305294357',3);
insert into categories (nom, id_discord, id_serveur) values ('Salons vocaux', '588356610305294359',3);
insert into categories (nom, id_discord, id_serveur) values ('Fire', '588359334191431693',3);

insert into salons (nom, id_discord, id_serveur) values ('Général', '588356321661943810',1);
insert into salons (nom, id_discord, id_serveur) values ('Général', '588356321661943812',1);
insert into salons (nom, id_discord, id_serveur) values ('Vador', '588361104435183633',1);
insert into salons (nom, id_discord, id_serveur) values ('Anakin', '588361164547817482',1);
insert into salons (nom, id_discord, id_serveur) values ('Dark', '588361195497455626',1);


insert into salons (nom, id_discord, id_serveur) values ('Général', '585723927087546370',2);
insert into salons (nom, id_discord, id_serveur) values ('Général', '585723927087546372',2);
insert into salons (nom, id_discord, id_serveur) values ('Script', '588361469087973407',2);

insert into salons (nom, id_discord, id_serveur) values ('Général', '588356610305294358',3);
insert into salons (nom, id_discord, id_serveur) values ('Général', '588356610762735627',3);
insert into salons (nom, id_discord, id_serveur) values ('Water', '588359751520485399',3);




 -- données fake pour tester table ref_roles

insert into ref_roles values ('admin', 1);
insert into ref_roles values ('moderateur', 3);
insert into ref_roles values ('surveillant', 5);
insert into ref_roles values ('neutre', 7);

 -- données fake pour tester roles

insert into roles (id_user_discord, id_serveur, nom, num) values ('585378439775911948' ,1, 'admin', 1);
insert into roles (id_user_discord, id_serveur, nom, num) values ('526301505888845826' ,1, 'moderateur', 3);


insert into roles (id_user_discord, id_serveur, nom, num) values ('526301505888845826', 2, 'admin', 1);
insert into roles (id_user_discord, id_serveur, nom, num) values ('585378439775911948', 2, 'moderateur', 3);


insert into roles (id_user_discord, id_serveur, nom, num) values ('585378439775911948', 3, 'admin', 1);
insert into roles (id_user_discord, id_serveur, nom, num) values ('526301505888845826', 3, 'surveillant', 5);

-- données  pour tester commandes

insert into commandes (nom, niveau_autorite,disponible) values ('ban', 4,true);
insert into commandes (nom, niveau_autorite,disponible) values ('mute', 6,true);
insert into commandes (nom, niveau_autorite,disponible) values ('rankdown', 4,true);
insert into commandes (nom, niveau_autorite,disponible) values ('rankup', 4,true);
insert into commandes (nom, niveau_autorite,disponible) values ('kick', 4,true);
insert into commandes (nom, niveau_autorite,disponible) values ('warn', 6,true);

-- données fake pour tester sanctions

insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut, date_fin)
values (1, 585378439775911948, 526301505888845826, 'ban', '2019-06-15','2019-08-15');

insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut, date_fin)
values (2, 526301505888845826, 585378439775911948, 'mute', '2019-06-20','2019-08-15');

insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut, date_fin)
values (3, 585378439775911948, 526301505888845826, 'ban', '2019-02-15','2019-09-15');

insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut, date_fin)
values (3, 585378439775911948, 526301505888845826, 'mute', '2019-04-15','2019-05-15');
