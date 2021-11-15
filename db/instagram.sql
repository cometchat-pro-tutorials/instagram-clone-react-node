DROP DATABASE IF EXISTS instagram;

CREATE DATABASE instagram;

USE instagram;

CREATE TABLE user_account (
	id VARCHAR(255) NOT NULL,
	user_email VARCHAR(255) NOT NULL,
	user_password VARCHAR(255) NOT NULL,
	user_full_name VARCHAR(255) NOT NULL,
	user_avatar VARCHAR(255) NOT NULL,
  user_number_of_posts INT NULL,
  user_number_of_followers INT NULL,
  user_number_of_following INT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE post (
	id BIGINT NOT NULL AUTO_INCREMENT,
	post_content VARCHAR(255) NOT NULL,
	post_category INT NOT NULL,
	post_created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	post_created_by VARCHAR(255) NOT NULL,
	post_number_of_reactions INT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE post_reaction (
	id BIGINT NOT NULL AUTO_INCREMENT,
	post_id BIGINT NOT NULL,
	user_id VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE user_notification (
	id BIGINT NOT NULL AUTO_INCREMENT,
  notification_image VARCHAR(255) NOT NULL,
	notification_message VARCHAR(255) NOT NULL,
	user_id VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE user_follower (
	id BIGINT NOT NULL AUTO_INCREMENT,
	follower_id VARCHAR(255) NOT NULL,
	user_id VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);


