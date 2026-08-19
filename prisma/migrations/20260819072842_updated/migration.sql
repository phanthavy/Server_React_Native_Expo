-- CreateTable
CREATE TABLE `Product` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(191) NOT NULL,
    `product_description` VARCHAR(191) NOT NULL,
    `product_price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Product_product_name_key`(`product_name`),
    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
