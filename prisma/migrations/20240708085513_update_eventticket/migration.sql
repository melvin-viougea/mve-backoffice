-- AlterTable
ALTER TABLE "EventTicket" ADD COLUMN     "eventId" INTEGER;

-- AddForeignKey
ALTER TABLE "EventTicket" ADD CONSTRAINT "EventTicket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
