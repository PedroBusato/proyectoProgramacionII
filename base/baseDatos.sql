-- DROP DATABASE IF EXISTS dataBaseProject;
CREATE DATABASE dataBaseFinalProject;

USE dataBaseFinalProject;

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
    userID INT UNSIGNED,
    userName VARCHAR (150),
    
    FOREIGN KEY (userID) REFERENCES users(idUser)
)
