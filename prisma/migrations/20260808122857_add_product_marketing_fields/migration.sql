-- AlterTable
ALTER TABLE `products` ADD COLUMN `discountPriceCents` INTEGER NULL,
    ADD COLUMN `originalPriceCents` INTEGER NULL,
    ADD COLUMN `subtitle` TEXT NULL,
    ADD COLUMN `title` VARCHAR(191) NULL;
