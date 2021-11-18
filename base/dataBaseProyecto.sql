CREATE DATABASE dataBaseProject;

USE dataBaseProject;



CREATE TABLE users(
    idUser INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	userName VARCHAR (150),
    fistName VARCHAR (150),
    lastName VARCHAR (150),
    email VARCHAR (200),
    userPassword VARCHAR (100),
    profilePic VARCHAR (500),
    birthDate DATE,
    userFollwers INT UNSIGNED,
    usersFollowing INT UNSIGNED
);

CREATE TABLE posts(
	idPost INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR (500),
    postDescription VARCHAR (500),
	postedDate DATE,
    idUser INT UNSIGNED,
    userName VARCHAR (150),
    
    FOREIGN KEY (idUser) REFERENCES users(idUser)
);
CREATE TABLE comments(
    idComment INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR (150) NOT NULL,
    dateComment DATE,
    commentText VARCHAR (300),
    idPost INT UNSIGNED,
    idUser INT UNSIGNED,
    
    FOREIGN KEY (idPost) REFERENCES posts(idPost),
    FOREIGN KEY (idUser) REFERENCES users(idUser)
);
-- Agregamos los registros a nuestra tabla 

INSERT INTO users VALUES
(default, "alexanderTheGr8", "Alejandro", "Magno", "alexanderGreat@greekmail.com", "hateGreeks", "/images/alejandroMagnoPerfil.jpg", "356-07-21", 210, 192),
(default, "FatherOfComodus", "Marco", "Aurelio", "Maurelio@yahoo.com.ar", "wannaReturnHome", "/images/marcoAurelioPerfil.jpg", "121-04-26", 110, 12),
(default, "FatherOfAll", "Gengis", "Kan", "KanG@mongol.com", "LoveMyself", "/images/gengisKanPerfil.jpg", "1162-04-16", 1100, 1112),
(default, "QueenSaviour_", "Winston", "Churchill", "ChruchillWinston@hotmail.com", "FishAndChips123", "/images/winstonChurchillPerfil.jpg", "1874-11-30", 100, 1192),
(default, "23StabsMan", "Julio", "Cesar", "JulioCesar@hotmail.com", "CaesarRome123", "/images/julioCesarPerfil.jpg", "80-09-17", 10, 12),
(default, "writeLessMind", "Socrates", "Sofronisco", "SocratesSofronisco@atenas.com", "MasterOfPlato", "/images/socratesPerfil.jpg", "450-12-02", 1391, 3123),
(default, "queenSlayer", "Henry", "VIII", "HenryVIII@outlook.com", "KingOfKings", "/images/henryViiiPerfil.jpg", "1522-05-12", 1, 21),
(default, "Boneless", "Ivar", "Ragnarsson", "RagnarssonB@skol.com", "RagnarsFavourite", "/images/ivarRagnarssonPerfil.jpg", "830-09-09", 13931, 97),
(default, "homelessBrilliance", "Diogenes", "De Sinope", "DeSinopeDiogenes@hotmail.com", "AtenasNewHome", "/images/diogenesDeSinopePerfil.jpg", "370-11-28", 9174, 0),
(default, "NapoleonMandaparte", "Napoleon", "Bonaparte", "NapoleonBonaparte@hotmail.com", "GreedPower", "/images/napoleonBonapartePerfil.jpg", "1799-12-12", 4194, 2188);


INSERT INTO posts values
(default, "/images/alejandroMagno.png", "Discurso en Opis", "324-07-31", 1, "alexanderTheGr8"),
(default, "/images/imagenPrueba2.jpg", "Con mi amigo Aristoteles", "317-04-21", 1, "alexanderTheGr8"),
(default, "/images/imagenPrueba.jpg", "The greatest ever", "360-11-10", 1, "alexanderTheGr8"),
(default, "/images/marcoAurelio.jpg", "Back from the North", "187-10-14", 2, "FatherOfComodus"),
(default, "/images/gengisKan.jpg", "Entrando a China con las tropas #DinastiaJin", "1234-08-17", 3, "FatherOfAll"),
(default, "/images/winstonChurchill.png", "Good ol' times", "1921-10-14", 4, "QueenSaviour_"),
(default, "/images/julioCesarPost.jpg", "#true #own #thoughts", "79-01-04", 5, "23StabsMan"),
(default, "/images/socratesPost.jpg", "Tarde de té y dialogo con ellos", "448-06-30", 6, "writeLessMind"),
(default, "/images/henryViiiPost.jpg", "Mis esposas. Las amo! <3", "1522-10-18", 7, "queenSlayer"),
(default, "/images/ivarRagnarssonPost.jpg", "Who needs legs when you can conquer Europe with your mind?", "880-07-31", 8, "Boneless"),
(default, "/images/diogenesDeSionopePost.jpg", "Quien se cree que es este para taparme la luz del sol? #cancelAlexanderTheGreat", "368-10-21", 9, "homelessBrilliance"),
(default, "/images/napoleonBonapartePost.jpg", "L'avarice casse le sac", "1800-01-21", 10, "NapoleonMandaparte");

INSERT INTO comments VALUES
(default, "FatherOfComodus", "324-07-31", "Alejandro Magno volve a Macedonia", 1, 2),
(default, "FatherOfAll", "324-11-21", "Amamos a Alejandro Magno", 1, 3),   
(default, "alexanderTheGr8", "1233-01-21", "Gengis Kan, China h8s u!", 3, 1),
(default, "alexanderTheGr8", "1231-05-22", "Stop attacking the Chinese", 3, 1),
(default, "QueenSaviour_", "1942-12-25", "I love myself (and my Queen)", 4, 4),
(default, "FatherOfComodus", "1940-05-12", "Appellatio non est bonum", 4, 2),
(default, "FatherOfAll", "185-01-30", "Mucha filosofia poca guerra Marco Aurelio. #bringBackNeron", 6, 3),
(default, "QueenSaviour_", "189-03-27", "LONG LIVE THE ROMAN EMPIRE #SPQR", 6, 4),
(default, "alexanderTheGr8", "79-8-13", "Should have checked your back", 7, 1),
(default, "Boneless", "79-8-14", "23? More like Jordan I think. HAHAHA", 7, 8),
(default, "NapoleonMandaparte", "448-02-10", "Como se que exististe si no dejaste nada escrito? #LonguevieàlaFrance", 8, 10),
(default, "NapoleonMandaparte", "448-02-12", "Y pensar que yo soy considerado orgulloso. Te tomaste veneno en lugar de aceptar tu error.", 8, 10),
(default, "Boneless", "1522-04-12", "Guess you are the problem mate.", 9, 8),
(default, "NapoleonMandaparte", "1522-04-16", "Las cosas con Josefina andan mal, pero al lado tuyo...", 9, 10),
(default, "QueenSaviour_", "880-10-13", "We have someone as intelligent as you in our times. Brilliant!", 10, 4),
(default, "FatherOfAll", "880-10-30", "Wanna stablish an alliance? Kiding, u r already dead", 10, 3),
(default, "alexanderTheGr8", "368-03-29", "Me moves de nuevo con la prepotencia con la que lo hiciste y te las vas a ver", 11, 1),
(default, "alexanderTheGr8", "368-03-29", "Te diria que te falta calle, pero justamente lo contrario", 11, 1),
(default, "homelessBrilliance", "1800-05-25", "Petiso", 12, 9),
(default, "Boneless", "1800-05-26", "HAHAHA Tiny Man", 12, 8),
(default, "Boneless", "1800-05-26", "Did not know modern France had goblins", 12, 8);

