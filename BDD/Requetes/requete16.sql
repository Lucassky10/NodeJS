Select distinct s1.id_user_discord,s1.id_serveur,s1.date_debut, s1.commande, s2.id_serveur,s2.date_debut, s2.commande
from sanctions s1,sanctions s2
where s1.id_user_discord=s2.id_user_discord
and (s1.date_debut<=s2.date_debut + INTERVAL '15 day'
or s1.date_debut<=s2.date_debut - INTERVAL '15 day')
and s1.id_serveur<s2.id_serveur;
