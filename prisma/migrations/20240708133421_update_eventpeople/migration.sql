/*
  Warnings:

  - You are about to drop the column `eventPeopleId` on the `Event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eventPeopleId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventPeopleId";

-- AlterTable
ALTER TABLE "EventPeople" ADD COLUMN     "eventId" INTEGER;

-- AddForeignKey
ALTER TABLE "EventPeople" ADD CONSTRAINT "EventPeople_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
