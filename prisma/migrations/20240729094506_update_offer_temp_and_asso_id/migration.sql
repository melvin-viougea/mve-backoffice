/*
  Warnings:

  - The `offerTemp` column on the `Partner` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "associationId" INTEGER NOT NULL DEFAULT 11,
DROP COLUMN "offerTemp",
ADD COLUMN     "offerTemp" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
