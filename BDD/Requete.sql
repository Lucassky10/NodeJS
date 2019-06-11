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
where roles.nom='moderateur' and roles.id_serveur=serveurs.id and serveurs.id_discord='3245';

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
