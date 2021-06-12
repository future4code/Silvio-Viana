CREATE TABLE Cookenu_Users (
id VARCHAR(64) PRIMARY KEY,
name VARCHAR(64) NOT NULL,
email VARCHAR(64) UNIQUE NOT NULL,
role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL",
password VARCHAR(64) NOT NULL
);


-- Apenas ADMINS podem Criar ADMINS
-- Conta ADMIN para criação de outras contas
-- login: "admin@base.com" password: "1234567"

INSERT INTO Cookenu_Users 
VALUES(
"74820ab9-86c1-4bd5-932b-7a77075b72fc",
"Admin",
"admin@base.com",
"ADMIN",
"$2a$12$vQTKWIpqs1WmXcOmFr3WveT9jHv7H5lN0ZitqMTamwyGjaFBrWxKG"
);

CREATE TABLE Cookenu_Recipes (
id VARCHAR(64) PRIMARY KEY,
title VARCHAR(64) NOT NULL,
description VARCHAR(64) NOT NULL,
instruction TEXT NOT NULL,
createdAt DATE NOT NULL,
creator_id VARCHAR(64),
FOREIGN KEY (creator_id) REFERENCES Cookenu_Users(id)
);

CREATE TABLE Cookenu_Follows (
follower_id VARCHAR(64),
followed_id VARCHAR(64),
FOREIGN KEY (follower_id) REFERENCES Cookenu_Users(id),
FOREIGN KEY (followed_id) REFERENCES Cookenu_Users(id)
);