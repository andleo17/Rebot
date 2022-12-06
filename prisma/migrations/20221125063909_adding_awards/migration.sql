-- CreateTable
CREATE TABLE "AwardCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AwardCategory_pkey" PRIMARY KEY ("id")
);
