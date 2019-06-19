select id_user_discord,commande,id_serveur from sanctions
where (id_user_discord,commande) IN (Select id_user_discord,commande  from sanctions group by id_user_discord,commande having count(id_serveur)>1);
