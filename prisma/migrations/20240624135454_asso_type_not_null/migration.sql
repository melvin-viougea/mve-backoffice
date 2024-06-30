/*
  Warnings:

  - Made the column `associationTypeId` on table `Association` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Association" DROP CONSTRAINT "Association_associationTypeId_fkey";

-- AlterTable
ALTER TABLE "Association" ALTER COLUMN "associationTypeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Association" ADD CONSTRAINT "Association_associationTypeId_fkey" FOREIGN KEY ("associationTypeId") REFERENCES "AssociationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
