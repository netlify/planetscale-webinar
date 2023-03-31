ALTER TABLE `summaries`
    ADD COLUMN `team_id` CHAR(32) AFTER `channel_id`,
    ADD INDEX `summaries_team_id` (`team_id`),;

CREATE TABLE `teams` (
    `team_id` CHAR(32) PRIMARY KEY,
    `team_name` VARCHAR(255) NOT NULL
)
