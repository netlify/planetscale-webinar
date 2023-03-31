CREATE TABLE `summaries` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `channel_id` CHAR(32) NOT NULL,
    `message_count` INT NOT NULL,
    `timestamp` DATETIME NOT NULL
)
