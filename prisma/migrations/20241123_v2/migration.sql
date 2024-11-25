DROP INDEX `users_username_key` ON `users`;

ALTER TABLE `users` DROP COLUMN `username`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
