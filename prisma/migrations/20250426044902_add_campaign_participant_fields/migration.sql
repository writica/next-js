-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CampaignParticipant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "total_score" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "blog_url" TEXT,
    "data" TEXT,
    CONSTRAINT "CampaignParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CampaignParticipant_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CampaignParticipant" ("campaignId", "createdAt", "id", "updatedAt", "userId") SELECT "campaignId", "createdAt", "id", "updatedAt", "userId" FROM "CampaignParticipant";
DROP TABLE "CampaignParticipant";
ALTER TABLE "new_CampaignParticipant" RENAME TO "CampaignParticipant";
CREATE UNIQUE INDEX "CampaignParticipant_userId_campaignId_key" ON "CampaignParticipant"("userId", "campaignId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
