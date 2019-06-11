create schema public;
create table ref_roles (
    nom varchar unique NOT NULL,
    num integer unique NOT NULL,
    primary key(nom, num)
);

create table serveurs (
    ID  SERIAL PRIMARY KEY,
    nom varchar unique not null,
    id_serveur_discord varchar(60) not null -- id du serveur (dans discord)
);

create table salons (
    id_discord  varchar unique not null,
    nom varchar unique not null,
    id_serveur integer references serveurs(id) -- id du serveur (dans discord)
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
    id_moderateur_discord varchar references roles(id_discord) ,
    id_user_discord varchar not null,
    id_salon_discord varchar references salons(id_user_discord),
    commande varchar references commandes(nom),
    date_debut date not null,
    date_fin date,
    raison varchar(120)
);

 -- données fake pour tester table serveurs
insert into serveurs (nom, id_serveur_discord) values ('wazoo', '12435');
insert into serveurs (nom, id_serveur_discord) values ('ouloulou', '3245');
insert into serveurs (nom, id_serveur_discord) values ('akiaki', '4563');
insert into serveurs (nom, id_serveur_discord) values ('pneu', '1212');

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

select * from roles;
select * from commandes;
select * from sanctions;
select * from serveurs;
select * from ref_roles;




1-
Select * from serveurs;

2-
Select distinct nom from roles;

3-
Update roles set nom='neutre', num=5
where id_user_discord=129 and id_serveur=3;

4-
Select id_user from roles
where nom='moderateur';

4-
Select id_user_discord from roles
where nom='moderateur' and id_serveur=3;

Select id_user_discord from roles,serveurs
where roles.nom='moderateur' and roles.id_serveur=serveurs.id and serveurs.id_serveur_discord='3245';

5-
insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut,date_fin)
values (2, 135, 120, 'ban', '2019-10-10','2019-11-03');
6-
Select * from sanctions where id_serveur=1;
Select commande from sanctions where id_serveur=1;
7-
select id_user_discord from sanctions where id_serveur=1 and date_fin>CURRENT_DATE;
select id_user_discord from sanctions where date_fin>CURRENT_DATE;

9-
Select id_user_discord, count(*) from sanctions group by id_user_discord;
Select commande,count(*) from sanctions where id_user_discord=120 group by commande;

10-
Select * from sanctions where id_moderateur_discord=134 and id_user_discord=120;

11-
Select commande as Nom_Sanction, count(*) from sanctions where id_moderateur_discord=134 group by commande; ;

13-
Select * from sanctions where id_serveur=2;

15-
Select id_user_discord from sanctions group by id_user_discord having count(id_serveur)>1;

16-
Select id_user_discord from sanctions where date_debut>CURRENT_DATE group by id_user_discord having count(id_serveur)>1;


17-
Select id_user_discord,commande  from sanctions group by id_user_discord,commande having count(id_serveur)>1;

select id_user_discord,commande,id_serveur from sanctions where (id_user_discord,commande) = (Select id_user_discord,commande  from sanctions group by id_user_discord,commande having count(id_serveur)>1);

select * from serveurs;
