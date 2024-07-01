/*
  Warnings:

  - Added the required column `email` to the `Campus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Campus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Campus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nbStudentId` to the `Campus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Campus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Campus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campus" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "nbStudentId" INTEGER NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "NbStudent" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NbStudent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Campus" ADD CONSTRAINT "Campus_nbStudentId_fkey" FOREIGN KEY ("nbStudentId") REFERENCES "NbStudent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
