-- CreateTable
CREATE TABLE "UserAssociation" (
    "userId" INTEGER NOT NULL,
    "associationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAssociation_pkey" PRIMARY KEY ("userId","associationId")
);

-- CreateTable
CREATE TABLE "_UserAssociations" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserAssociations_AB_unique" ON "_UserAssociations"("A", "B");

-- CreateIndex
CREATE INDEX "_UserAssociations_B_index" ON "_UserAssociations"("B");

-- AddForeignKey
ALTER TABLE "UserAssociation" ADD CONSTRAINT "UserAssociation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAssociation" ADD CONSTRAINT "UserAssociation_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAssociations" ADD CONSTRAINT "_UserAssociations_A_fkey" FOREIGN KEY ("A") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAssociations" ADD CONSTRAINT "_UserAssociations_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
