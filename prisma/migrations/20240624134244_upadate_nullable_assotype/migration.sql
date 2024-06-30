-- DropForeignKey
ALTER TABLE "Association" DROP CONSTRAINT "Association_associationTypeId_fkey";

-- AddForeignKey
ALTER TABLE "Association" ADD CONSTRAINT "Association_associationTypeId_fkey" FOREIGN KEY ("associationTypeId") REFERENCES "AssociationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
