/*
  Warnings:

  - You are about to drop the column `address` on the `SuperUser` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `SuperUser` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `SuperUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SuperUser" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "postalCode";
