-- AlterTable
ALTER TABLE `orders` ADD COLUMN `deliveryArea` VARCHAR(191) NOT NULL DEFAULT 'inside_dhaka',
    ADD COLUMN `deliveryChargeCents` INTEGER NOT NULL DEFAULT 80,
    ADD COLUMN `grandTotalCents` INTEGER NOT NULL DEFAULT 0;
