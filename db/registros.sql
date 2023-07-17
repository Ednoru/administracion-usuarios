CREATE DATABASE Registros;

USE Registros;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    /*la contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número*/
    password VARCHAR(255) NOT NULL,
    CONSTRAINT password_check CHECK (password REGEXP '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),

    PRIMARY KEY (user_id)
);

CREATE TABLE followers (
    user_id INT NOT NULL,
    follower_id INT NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (follower_id) REFERENCES users(user_id),

    PRIMARY KEY (user_id, follower_id)
);

CREATE TABLE posts (
    post_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255),
    content_txt TEXT,
    content_img VARCHAR(255),
    content_video VARCHAR(255),
    content_link VARCHAR(255),
    content_audio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id),

    PRIMARY KEY (post_id)
);

CREATE TABLE reactions (
    reaction_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    reaction_type VARCHAR(50) NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id),

    PRIMARY KEY (reaction_id)
);

CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    content_txt TEXT,
    content_img VARCHAR(255),
    content_video VARCHAR(255),
    content_link VARCHAR(255),
    content_audio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id),

    PRIMARY KEY (comment_id)
);

/*borrar tablas*/
DROP TABLE users;
DROP TABLE followers;
DROP TABLE posts;
DROP TABLE reactions;
DROP TABLE comments;

INSERT INTO users (name, last_name, nickname, email, password) VALUES ('Juan', 'Perez', 'juanperez', 'jp@gmail.com', 'Juanperez1');

SELECT * FROM users;