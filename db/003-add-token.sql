ALTER TABLE `teams`
    ADD COLUMN `token` VARCHAR(255) AFTER `team_name`,
    ADD COLUMN `bot_id` VARCHAR(255) AFTER `token`;
