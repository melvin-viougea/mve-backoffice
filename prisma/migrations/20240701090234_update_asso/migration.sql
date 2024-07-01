/*
  Warnings:

  - Added the required column `description` to the `Association` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Association` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Association` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Association` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Association` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Association` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Association` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Association" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
