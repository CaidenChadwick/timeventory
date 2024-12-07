/*
  Warnings:

  - You are about to drop the column `volunteerOrgID` on the `VolunteerLog` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VolunteerLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgID" TEXT NOT NULL,
    "volunteerUserID" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME,
    "messesage" TEXT,
    CONSTRAINT "VolunteerLog_orgID_fkey" FOREIGN KEY ("orgID") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VolunteerLog_volunteerUserID_orgID_fkey" FOREIGN KEY ("volunteerUserID", "orgID") REFERENCES "Volunteer" ("userID", "orgID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VolunteerLog" ("endTime", "id", "messesage", "orgID", "startTime", "volunteerUserID") SELECT "endTime", "id", "messesage", "orgID", "startTime", "volunteerUserID" FROM "VolunteerLog";
DROP TABLE "VolunteerLog";
ALTER TABLE "new_VolunteerLog" RENAME TO "VolunteerLog";
CREATE INDEX "VolunteerLog_volunteerUserID_orgID_idx" ON "VolunteerLog"("volunteerUserID", "orgID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
