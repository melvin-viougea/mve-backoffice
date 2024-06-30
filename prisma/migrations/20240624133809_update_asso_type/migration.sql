/*
  Warnings:

  - Added the required column `associationTypeId` to the `Association` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Association" ADD COLUMN     "associationTypeId" INTEGER,
ADD COLUMN     "eventTypeId" INTEGER;

-- CreateTable
CREATE TABLE "AssociationType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssociationType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Association" ADD CONSTRAINT "Association_associationTypeId_fkey" FOREIGN KEY ("associationTypeId") REFERENCES "AssociationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Association" ADD CONSTRAINT "Association_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "EventType"("id") ON DELETE SET NULL ON UPDATE CASCADE;