/*
  Warnings:

  - You are about to drop the column `messesage` on the `VolunteeringRequest` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VolunteeringRequest" (
    "userID" TEXT NOT NULL,
    "orgID" TEXT NOT NULL,
    "message" TEXT,

    PRIMARY KEY ("userID", "orgID"),
    CONSTRAINT "VolunteeringRequest_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VolunteeringRequest_orgID_fkey" FOREIGN KEY ("orgID") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VolunteeringRequest" ("orgID", "userID") SELECT "orgID", "userID" FROM "VolunteeringRequest";
DROP TABLE "VolunteeringRequest";
ALTER TABLE "new_VolunteeringRequest" RENAME TO "VolunteeringRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
