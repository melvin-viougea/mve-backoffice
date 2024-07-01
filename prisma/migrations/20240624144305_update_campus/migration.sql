/*
  Warnings:

  - Added the required column `address` to the `Campus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campusTypeId` to the `Campus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Campus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Campus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campus" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "campusTypeId" INTEGER NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CampusType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampusType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Campus" ADD CONSTRAINT "Campus_campusTypeId_fkey" FOREIGN KEY ("campusTypeId") REFERENCES "CampusType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
