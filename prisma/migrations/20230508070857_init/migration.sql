-- DropForeignKey
ALTER TABLE `storage` DROP FOREIGN KEY `storage_parentId_fkey`;

-- AddForeignKey
ALTER TABLE `storage` ADD CONSTRAINT `storage_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `storage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
