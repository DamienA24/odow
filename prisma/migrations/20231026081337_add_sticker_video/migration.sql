/*
  Warnings:

  - Added the required column `calories` to the `Workouts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `account_ibfk_1`;

-- AlterTable
ALTER TABLE `Exercises` ADD COLUMN `stickerVideo` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `Workouts` ADD COLUMN `calories` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
