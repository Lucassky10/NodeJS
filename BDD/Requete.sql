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
Update roles set nom='neutre', num=7
where id_user_discord='526301505888845826' and id_serveur=3;

4-
Select id_user_discord from roles
where nom='moderateur' and id_serveur='1';

4-
Select id_user_discord from roles
where nom='moderateur' and id_serveur=3;

--Select id_user_discord from roles,serveurs
--where roles.nom='moderateur' and roles.id_serveur=serveurs.id and serveurs.id_discord='3245';

5-
insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut, date_fin)
values (3, 585378439775911948, 526301505888845826, 'mute', '2019-04-10','2019-04-11');
6-
Select * from sanctions where id_serveur=3;

7-
select distinct id_user_discord from sanctions where id_serveur=3 and date_fin>CURRENT_DATE;


9-
Select id_user_discord, count(*) from sanctions group by id_user_discord;
--Select commande,count(*) from sanctions where id_user_discord=XX group by commande;

10-
Select * from sanctions where id_moderateur_discord='585378439775911948' and id_user_discord='526301505888845826';

11-
Select commande as Nom_Sanction, count(*) from sanctions where id_moderateur_discord='585378439775911948' group by commande; ;

13-
Select * from sanctions where id_serveur=3;

15-
Select id_user_discord from sanctions group by id_user_discord having count(id_serveur)>1;

16-
Select distinct s1.id_user_discord,s1.id_serveur,s1.date_debut, s1.commande, s2.id_serveur,s2.date_debut, s2.commande
from sanctions s1,sanctions s2
where s1.id_user_discord=s2.id_user_discord
and (s1.date_debut<=s2.date_debut + INTERVAL '15 day'
or s1.date_debut<=s2.date_debut - INTERVAL '15 day')
and s1.id_serveur<s2.id_serveur;


17-

select id_user_discord,commande,id_serveur from sanctions
where (id_user_discord,commande) IN (Select id_user_discord,commande  from sanctions group by id_user_discord,commande having count(id_serveur)>1);
