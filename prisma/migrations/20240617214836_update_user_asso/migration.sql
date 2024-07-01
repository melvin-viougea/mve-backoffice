/*
  Warnings:

  - You are about to drop the `_UserAssociations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserAssociations" DROP CONSTRAINT "_UserAssociations_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserAssociations" DROP CONSTRAINT "_UserAssociations_B_fkey";

-- DropTable
DROP TABLE "_UserAssociations";
