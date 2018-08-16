------------------------------------------------------------
--        Script Postgre 
------------------------------------------------------------



------------------------------------------------------------
-- Drop
------------------------------------------------------------
DROP TABLE IF EXISTS public.Participate CASCADE;
DROP TABLE IF EXISTS public.Own CASCADE;
DROP TABLE IF EXISTS public.Is_Friend CASCADE;
DROP TABLE IF EXISTS public.Belong CASCADE;
DROP TABLE IF EXISTS public.Frequent CASCADE;
DROP TABLE IF EXISTS public.Place CASCADE;
DROP TABLE IF EXISTS public.Type CASCADE;
DROP TABLE IF EXISTS public.Group CASCADE;
DROP TABLE IF EXISTS public.User CASCADE;



------------------------------------------------------------
-- Table: User
------------------------------------------------------------
CREATE TABLE public.User(
	user_id                 SERIAL NOT NULL ,
	user_firstname          VARCHAR (50) NOT NULL ,
	user_name               VARCHAR (50) NOT NULL ,
	user_date_inscription   DATE  NOT NULL ,
	user_mail               VARCHAR (50) NOT NULL ,
	user_phone              VARCHAR (10) NOT NULL ,
	user_pseudo             VARCHAR (50) NOT NULL ,
	user_description        VARCHAR (200)  ,
	user_visibility         VARCHAR (20) NOT NULL ,
	user_picture            VARCHAR (250)   ,
	CONSTRAINT User_PK PRIMARY KEY (user_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Place
------------------------------------------------------------
CREATE TABLE public.Place(
	place_id                   SERIAL NOT NULL ,
	place_name                 VARCHAR (50) NOT NULL ,
	place_description          VARCHAR (500) NOT NULL ,
	place_adress_num           VARCHAR (50) NOT NULL ,
	place_adress_street        VARCHAR (250) NOT NULL ,
	place_adress_postal_code   VARCHAR (5) NOT NULL ,
	place_adress_city          VARCHAR (50) NOT NULL ,
	place_adress_country       VARCHAR (50) NOT NULL ,
	place_adress_details       VARCHAR (250)   ,
	CONSTRAINT Place_PK PRIMARY KEY (place_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Type
------------------------------------------------------------
CREATE TABLE public.Type(
	type_id            SERIAL NOT NULL ,
	type_name          VARCHAR (50) NOT NULL ,
	type_description   VARCHAR (250) NOT NULL  ,
	CONSTRAINT Type_PK PRIMARY KEY (type_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: group
------------------------------------------------------------
CREATE TABLE public.group(
	group_id              SERIAL NOT NULL ,
	group_name            VARCHAR (25) NOT NULL ,
	group_description     VARCHAR (250) NOT NULL ,
	group_picture         VARCHAR (250) NOT NULL ,
	group_date_creation   DATE  NOT NULL  ,
	CONSTRAINT group_PK PRIMARY KEY (group_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Frequent
------------------------------------------------------------
CREATE TABLE public.Frequent(
	user_id               INT  NOT NULL ,
	place_id              INT  NOT NULL ,
	group_id              INT  NOT NULL ,
	frequent_date_start   DATE  NOT NULL ,
	frequent_date_end     DATE  NOT NULL ,
	frequent_visibility   VARCHAR (20) NOT NULL ,
	frequent_feedback     VARCHAR (250) NOT NULL  ,
	CONSTRAINT Frequent_PK PRIMARY KEY (user_id,place_id,group_id)

	,CONSTRAINT Frequent_User_FK FOREIGN KEY (user_id) REFERENCES public.User(user_id)
	,CONSTRAINT Frequent_Place0_FK FOREIGN KEY (place_id) REFERENCES public.Place(place_id)
	,CONSTRAINT Frequent_group1_FK FOREIGN KEY (group_id) REFERENCES public.group(group_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Is_Friend
------------------------------------------------------------
CREATE TABLE public.Is_Friend(
	user_id               INT  NOT NULL ,
	user_id_Have_Friend   INT  NOT NULL ,
	isfriend_state        VARCHAR (50) NOT NULL  ,
	CONSTRAINT Is_Friend_PK PRIMARY KEY (user_id,user_id_Have_Friend)

	,CONSTRAINT Is_Friend_User_FK FOREIGN KEY (user_id) REFERENCES public.User(user_id)
	,CONSTRAINT Is_Friend_User0_FK FOREIGN KEY (user_id_Have_Friend) REFERENCES public.User(user_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Belong
------------------------------------------------------------
CREATE TABLE public.Belong(
	type_id    INT  NOT NULL ,
	place_id   INT  NOT NULL  ,
	CONSTRAINT Belong_PK PRIMARY KEY (type_id,place_id)

	,CONSTRAINT Belong_Type_FK FOREIGN KEY (type_id) REFERENCES public.Type(type_id)
	,CONSTRAINT Belong_Place0_FK FOREIGN KEY (place_id) REFERENCES public.Place(place_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Own
------------------------------------------------------------
CREATE TABLE public.Own(
	group_id   INT  NOT NULL ,
	user_id    INT  NOT NULL  ,
	CONSTRAINT Own_PK PRIMARY KEY (group_id,user_id)

	,CONSTRAINT Own_group_FK FOREIGN KEY (group_id) REFERENCES public.group(group_id)
	,CONSTRAINT Own_User0_FK FOREIGN KEY (user_id) REFERENCES public.User(user_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Participate
------------------------------------------------------------
CREATE TABLE public.Participate(
	group_id   INT  NOT NULL ,
	user_id    INT  NOT NULL  ,
	CONSTRAINT Participate_PK PRIMARY KEY (group_id,user_id)

	,CONSTRAINT Participate_group_FK FOREIGN KEY (group_id) REFERENCES public.group(group_id)
	,CONSTRAINT Participate_User0_FK FOREIGN KEY (user_id) REFERENCES public.User(user_id)
)WITHOUT OIDS;




------------------------------------------------------------
-- Insert
------------------------------------------------------------

INSERT INTO "user" (user_firstname, user_name, user_date_inscription, user_mail, user_phone, user_pseudo, user_description, user_visibility, user_picture) VALUES ('pernelle', 'Léo', '2018-01-01', 'macouille@gmail.com', '0610071008', 'pernichtre', 'Benjamin Pavard t es là t es mon sauce', 'private', NULL);
INSERT INTO "user" (user_firstname, user_name, user_date_inscription, user_mail, user_phone, user_pseudo, user_description, user_visibility, user_picture) VALUES ('Terrien', 'Jaimse', '2018-01-01', 'macouille@gmail.com', '0610071008', 'lejameuxestextra', 'Benjamin Pavard t es là t es mon sauce', 'public', NULL);
INSERT INTO "user" (user_firstname, user_name, user_date_inscription, user_mail, user_phone, user_pseudo, user_description, user_visibility, user_picture) VALUES ('Fabre', 'Enzo', '2018-01-01', 'macouille@gmail.com', '0610071008', 'zozolezozio', 'Benjamin Pavard t es là t es mon sauce', 'public', NULL);
INSERT INTO "user" (user_firstname, user_name, user_date_inscription, user_mail, user_phone, user_pseudo, user_description, user_visibility, user_picture) VALUES ('Pluche', 'Cyril', '2018-01-01', 'macouille@gmail.com', '0610071008', 'pluchezerrr', 'Benjamin Pavard t es là t es mon sauce', 'private', NULL);
INSERT INTO "user" (user_firstname, user_name, user_date_inscription, user_mail, user_phone, user_pseudo, user_description, user_visibility, user_picture) VALUES ('Thauvin', 'Florian', '2018-02-02', 'macouille@gmail.com', '0610568902', 'flothauv', 'On est là on a arnaqué la coupe du monde mdr', 'public', '\x6e756c6c');
INSERT INTO "user" (user_firstname, user_name, user_date_inscription, user_mail, user_phone, user_pseudo, user_description, user_visibility, user_picture) VALUES ('Pluche', 'Eric', '2018-01-01', 'Pluche@gmail.com', '0303030303', 'pluchito', 'salut les copains', 'private', NULL);


INSERT INTO "place" (place_name, place_description, place_adress_num, place_adress_street, place_adress_postal_code, place_adress_city, place_adress_country) VALUES ('Panama Café', 'Cette discothèque-bar au style latino dispose de 2 salles aux ambiances différentes, pour une clientèle jeune', '5', 'rue de la république', '34000', 'Montpellier', 'France');
INSERT INTO "place" (place_name, place_description, place_adress_num, place_adress_street, place_adress_postal_code, place_adress_city, place_adress_country) VALUES ('Rockstorr', 'Concerts de groupes locaux et internationaux, hommages et sets de DJ dans une salle de rock réputée.', '20', 'rue de Verdun', '34000', 'Montpellier', 'France');
INSERT INTO "place" (place_name, place_description, place_adress_num, place_adress_street, place_adress_postal_code, place_adress_city, place_adress_country) VALUES ('PZ City Club', 'Sur 2 niveaux, cette discothèque est spécialisée dans les soirées étudiantes et dispose de lumières tamisées.', '4', 'quaie du Verdanson', '34000', 'Montpellier', 'France');
INSERT INTO "place" (place_name, place_description, place_adress_num, place_adress_street, place_adress_postal_code, place_adress_city, place_adress_country) VALUES ('Cargo', 'Ce bar et boîte de nuit avec mezzanine organise de nombreuses soirées à thèmes et des cours de salsa.', '5', 'rue du grand Saint-Jean', '34000', 'Montpellier', 'France');
