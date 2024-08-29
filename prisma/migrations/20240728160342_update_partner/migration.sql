/*
  Warnings:

  - Added the required column `address` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerLimit` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerTemp` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reduction` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "displayTypeId" INTEGER,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "offerLimit" INTEGER NOT NULL,
ADD COLUMN     "offerTemp" INTEGER NOT NULL,
ADD COLUMN     "percentage" INTEGER NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "place" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "reduction" INTEGER NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "subPartnerTypeId" INTEGER;

-- CreateTable
CREATE TABLE "SubPartnerType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubPartnerType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_subPartnerTypeId_fkey" FOREIGN KEY ("subPartnerTypeId") REFERENCES "SubPartnerType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_displayTypeId_fkey" FOREIGN KEY ("displayTypeId") REFERENCES "DisplayType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
