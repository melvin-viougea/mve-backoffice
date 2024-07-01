/*
  Warnings:

  - You are about to drop the `UserAssociation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `associationId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserAssociation" DROP CONSTRAINT "UserAssociation_associationId_fkey";

-- DropForeignKey
ALTER TABLE "UserAssociation" DROP CONSTRAINT "UserAssociation_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "associationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserAssociation";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
