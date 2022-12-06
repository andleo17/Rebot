-- AlterTable
ALTER TABLE "GuildConfig" ALTER COLUMN "musicChannel" DROP NOT NULL,
ALTER COLUMN "suggestChannel" DROP NOT NULL,
ALTER COLUMN "ticketChannel" DROP NOT NULL,
ALTER COLUMN "ticketCategory" DROP NOT NULL,
ALTER COLUMN "botChannel" DROP NOT NULL;
