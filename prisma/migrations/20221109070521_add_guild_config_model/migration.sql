-- CreateTable
CREATE TABLE "GuildConfig" (
    "guildId" TEXT NOT NULL,
    "musicChannel" TEXT NOT NULL,
    "suggestChannel" TEXT NOT NULL,
    "ticketChannel" TEXT NOT NULL,
    "ticketCategory" TEXT NOT NULL,
    "botChannel" TEXT NOT NULL,
    "eightBallAnswers" TEXT[],

    CONSTRAINT "GuildConfig_pkey" PRIMARY KEY ("guildId")
);
