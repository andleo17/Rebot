-- CreateTable
CREATE TABLE "AwardNomination" (
    "id" SERIAL NOT NULL,
    "member" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "AwardNomination_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AwardNomination" ADD CONSTRAINT "AwardNomination_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AwardCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
