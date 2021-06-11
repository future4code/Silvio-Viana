CREATE TABLE Cookenu_Users (
id VARCHAR(64) PRIMARY KEY,
name VARCHAR(64) NOT NULL,
email VARCHAR(64) UNIQUE NOT NULL,
role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL",
password VARCHAR(64) NOT NULL
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