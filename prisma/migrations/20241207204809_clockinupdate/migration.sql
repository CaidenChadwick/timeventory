-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Volunteer" (
    "userID" TEXT NOT NULL,
    "orgID" TEXT NOT NULL,
    "isClockedIn" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("userID", "orgID"),
    CONSTRAINT "Volunteer_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Volunteer_orgID_fkey" FOREIGN KEY ("orgID") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Volunteer" ("orgID", "userID") SELECT "orgID", "userID" FROM "Volunteer";
DROP TABLE "Volunteer";
ALTER TABLE "new_Volunteer" RENAME TO "Volunteer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
