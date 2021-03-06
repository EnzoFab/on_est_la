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
DROP TABLE IF EXISTS public.Frequent_Date CASCADE;
DROP TABLE IF EXISTS public.Frequent_Group CASCADE;
DROP TABLE IF EXISTS public.Frequent_User CASCADE;
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
	user_pass               VARCHAR (250) NOT NULL ,
	user_mail               VARCHAR (50) NOT NULL ,
	user_token              VARCHAR (250) NOT NULL ,
	user_phone              VARCHAR (10)  ,
	user_pseudo             VARCHAR (50) NOT NULL ,
	user_description        VARCHAR (200)  ,
	user_visibility         VARCHAR (20) NOT NULL ,
	user_picture            VARCHAR (250)  ,
	user_account_state      VARCHAR (250)  ,
	user_number_party       INT    ,
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
	place_adress_details       VARCHAR (250)  ,
	place_map_lat              VARCHAR (50)  ,
	place_map_lon              VARCHAR (50)   ,
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
-- Table: Group
------------------------------------------------------------
CREATE TABLE public.Group(
	group_id              SERIAL NOT NULL ,
	group_name            VARCHAR (25) NOT NULL ,
	group_description     VARCHAR (250) NOT NULL ,
	group_picture         VARCHAR (250) NOT NULL ,
	group_date_creation   DATE  NOT NULL  ,
	CONSTRAINT Group_PK PRIMARY KEY (group_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Frequent_Date
------------------------------------------------------------
CREATE TABLE public.Frequent_Date(
	frequent_date_start   DATE  NOT NULL  ,
	CONSTRAINT Frequent_Date_PK PRIMARY KEY (frequent_date_start)
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

	,CONSTRAINT Own_Group_FK FOREIGN KEY (group_id) REFERENCES public.Group(group_id)
	,CONSTRAINT Own_User0_FK FOREIGN KEY (user_id) REFERENCES public.User(user_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Participate
------------------------------------------------------------
CREATE TABLE public.Participate(
	group_id   INT  NOT NULL ,
	user_id    INT  NOT NULL  ,
	CONSTRAINT Participate_PK PRIMARY KEY (group_id,user_id)

	,CONSTRAINT Participate_Group_FK FOREIGN KEY (group_id) REFERENCES public.Group(group_id)
	,CONSTRAINT Participate_User0_FK FOREIGN KEY (user_id) REFERENCES public.User(user_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Frequent_User
------------------------------------------------------------
CREATE TABLE public.Frequent_User(
	user_id                    INT  NOT NULL ,
	place_id                   INT  NOT NULL ,
	frequent_date_start        DATE  NOT NULL ,
	frequent_user_date_end     DATE  NOT NULL ,
	frequent_user_visibility   VARCHAR (250) NOT NULL ,
	frequent_user_feedback     VARCHAR (250)   ,
	CONSTRAINT Frequent_User_PK PRIMARY KEY (user_id,place_id,frequent_date_start)

	,CONSTRAINT Frequent_User_User_FK FOREIGN KEY (user_id) REFERENCES public.User(user_id)
	,CONSTRAINT Frequent_User_Place0_FK FOREIGN KEY (place_id) REFERENCES public.Place(place_id)
	,CONSTRAINT Frequent_User_Frequent_Date1_FK FOREIGN KEY (frequent_date_start) REFERENCES public.Frequent_Date(frequent_date_start)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Frequent_group
------------------------------------------------------------
CREATE TABLE public.Frequent_group(
	place_id                    INT  NOT NULL ,
	group_id                    INT  NOT NULL ,
	frequent_date_start         DATE  NOT NULL ,
	frequent_group_date_end     DATE  NOT NULL ,
	frequent_group_visibility   VARCHAR (250) NOT NULL ,
	frequent_group_feedback     VARCHAR (250)   ,
	CONSTRAINT Frequent_group_PK PRIMARY KEY (place_id,group_id,frequent_date_start)

	,CONSTRAINT Frequent_group_Place_FK FOREIGN KEY (place_id) REFERENCES public.Place(place_id)
	,CONSTRAINT Frequent_group_Group0_FK FOREIGN KEY (group_id) REFERENCES public.Group(group_id)
	,CONSTRAINT Frequent_group_Frequent_Date1_FK FOREIGN KEY (frequent_date_start) REFERENCES public.Frequent_Date(frequent_date_start)
)WITHOUT OIDS;



------------------------------------------------------------
-- Insert
------------------------------------------------------------

INSERT INTO "user" (user_firstname, user_name, user_date_inscription, user_pass, user_token, user_mail, user_phone, user_pseudo, user_description, user_visibility, user_picture) VALUES ('pernelle', 'Léo', '2018-01-01', 'onestla', 'tokenouaisouais', 'macouille@gmail.com', '0610071008', 'pernichtre', 'Benjamin Pavard t es là t es mon sauce', 'private', NULL);
INSERT INTO "user" (user_firstname, user_name, user_date_inscription, user_pass, user_token, user_mail, user_phone, user_pseudo, user_description, user_visibility, user_picture) VALUES ('Terrien', 'Jaimse', '2018-01-01', 'onestla', 'tokenouaisouais', 'macouille@gmail.com', '0610071008', 'lejameuxestextra', 'Benjamin Pavard t es là t es mon sauce', 'public', NULL);
INSERT INTO "user" (user_firstname, user_name, user_date_inscription, user_pass, user_token, user_mail, user_phone, user_pseudo, user_description, user_visibility, user_picture) VALUES ('Fabre', 'Enzo', '2018-01-01', 'onestla', 'tokenouaisouais', 'macouille@gmail.com', '0610071008', 'zozolezozio', 'Benjamin Pavard t es là t es mon sauce', 'public', NULL);
INSERT INTO "user" (user_firstname, user_name, user_date_inscription, user_pass, user_token, user_mail, user_phone, user_pseudo, user_description, user_visibility, user_picture) VALUES ('Pluche', 'Cyril', '2018-01-01', 'onestla', 'tokenouaisouais', 'macouille@gmail.com', '0610071008', 'pluchezerrr', 'Benjamin Pavard t es là t es mon sauce', 'private', NULL);
INSERT INTO "user" (user_firstname, user_name, user_date_inscription, user_pass, user_token, user_mail, user_phone, user_pseudo, user_description, user_visibility, user_picture) VALUES ('Thauvin', 'Florian', '2018-02-02', 'onestla', 'tokenouaisouais', 'macouille@gmail.com', '0610568902', 'flothauv', 'On est là on a arnaqué la coupe du monde mdr', 'public', '\x6e756c6c');
INSERT INTO "user" (user_firstname, user_name, user_date_inscription, user_pass, user_token, user_mail, user_phone, user_pseudo, user_description, user_visibility, user_picture) VALUES ('Pluche', 'Eric', '2018-01-01', 'onestla', 'tokenouaisouais', 'Pluche@gmail.com', '0303030303', 'pluchito', 'salut les copains', 'private', NULL);


INSERT INTO "place" (place_name, place_description, place_adress_num, place_adress_street, place_adress_postal_code, place_adress_city, place_adress_country) VALUES ('Panama Café', 'Cette discothèque-bar au style latino dispose de 2 salles aux ambiances différentes, pour une clientèle jeune', '5', 'rue de la république', '34000', 'Montpellier', 'France');
INSERT INTO "place" (place_name, place_description, place_adress_num, place_adress_street, place_adress_postal_code, place_adress_city, place_adress_country) VALUES ('Rockstorr', 'Concerts de groupes locaux et internationaux, hommages et sets de DJ dans une salle de rock réputée.', '20', 'rue de Verdun', '34000', 'Montpellier', 'France');
INSERT INTO "place" (place_name, place_description, place_adress_num, place_adress_street, place_adress_postal_code, place_adress_city, place_adress_country) VALUES ('PZ City Club', 'Sur 2 niveaux, cette discothèque est spécialisée dans les soirées étudiantes et dispose de lumières tamisées.', '4', 'quaie du Verdanson', '34000', 'Montpellier', 'France');
INSERT INTO "place" (place_name, place_description, place_adress_num, place_adress_street, place_adress_postal_code, place_adress_city, place_adress_country) VALUES ('Cargo', 'Ce bar et boîte de nuit avec mezzanine organise de nombreuses soirées à thèmes et des cours de salsa.', '5', 'rue du grand Saint-Jean', '34000', 'Montpellier', 'France');
