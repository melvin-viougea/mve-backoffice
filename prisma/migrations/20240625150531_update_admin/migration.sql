/*
  Warnings:

  - You are about to drop the column `eventTypeId` on the `Association` table. All the data in the column will be lost.
  - Made the column `campusId` on table `Association` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Association" DROP CONSTRAINT "Association_campusId_fkey";

-- DropForeignKey
ALTER TABLE "Association" DROP CONSTRAINT "Association_eventTypeId_fkey";

-- AlterTable
ALTER TABLE "Association" DROP COLUMN "eventTypeId",
ALTER COLUMN "campusId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Association" ADD CONSTRAINT "Association_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
