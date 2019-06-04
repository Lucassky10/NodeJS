create database tp_dao;


create table Adresse (
	id int not null auto_increment,
	numero varchar(30) not null,
	rue varchar(30) not null,
	code_postal varchar(30) not null,
	ville varchar(30) not null,
	pays varchar(30) not null,
	comment varchar(200),
	primary key (id)
);

create table Contact (
	id int not null auto_increment,
	nom varchar(30) not null,
	prenom varchar(30) not null,
	date_nais date not null,
	constraint type_contact varchar(30) not null check ('ami' OR 'famille'),
	adr_mel varchar(30),
	id_adresse int varchar(30),
	primary key (id),
	foreign key (id_adresse) references Adresse(id)
);

insert into Adresse values ('12', 'Boulevard de rose', '22300', 'Lannion', 'France');
insert into Adresse values ('21', 'Rue du pont', '35000', 'Rennes', 'France');
insert into Adresse values ('39', 'Avenue des Champs Elysées', '94000', 'Paris', 'France');


insert into Contact values ('Rollin', 'Lucas', '10-09-1998', 'ami', 'lrollin@live.fr', 1);
insert into Contact values ('Chantrel', 'Romain', '06-29-1998', 'famille', 'rchantrel@enssat.fr', 2);
insert into Contact values ('Le Gallo', 'Benjamin', '08-18-1998', 'famille', 'blegallo@enssat.fr', 3);