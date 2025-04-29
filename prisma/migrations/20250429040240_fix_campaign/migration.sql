/*
  Warnings:

  - You are about to drop the column `campaginAddress` on the `Campaign` table. All the data in the column will be lost.
  - Added the required column `campaignAddress` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "campaignAddress" TEXT NOT NULL,
    "txHash" TEXT,
    "aiDescription" TEXT,
    "keywords" TEXT,
    "targetAudience" TEXT,
    "CtaGoal" TEXT,
    "coverImage" TEXT,
    "rewardPool" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Campaign_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Campaign" ("CtaGoal", "aiDescription", "coverImage", "createdAt", "description", "endDate", "id", "keywords", "ownerId", "rewardPool", "startDate", "status", "targetAudience", "title", "txHash", "updatedAt") SELECT "CtaGoal", "aiDescription", "coverImage", "createdAt", "description", "endDate", "id", "keywords", "ownerId", "rewardPool", "startDate", "status", "targetAudience", "title", "txHash", "updatedAt" FROM "Campaign";
DROP TABLE "Campaign";
ALTER TABLE "new_Campaign" RENAME TO "Campaign";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
