-- CreateTable
CREATE TABLE "Volunteer" (
    "userID" TEXT NOT NULL,
    "orgID" TEXT NOT NULL,

    PRIMARY KEY ("userID", "orgID"),
    CONSTRAINT "Volunteer_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Volunteer_orgID_fkey" FOREIGN KEY ("orgID") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VolunteeringRequest" (
    "userID" TEXT NOT NULL,
    "orgID" TEXT NOT NULL,
    "messesage" TEXT NOT NULL,

    PRIMARY KEY ("userID", "orgID"),
    CONSTRAINT "VolunteeringRequest_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VolunteeringRequest_orgID_fkey" FOREIGN KEY ("orgID") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VolunteerLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgID" TEXT NOT NULL,
    "volunteerUserID" TEXT NOT NULL,
    "volunteerOrgID" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME,
    "messesage" TEXT,
    CONSTRAINT "VolunteerLog_orgID_fkey" FOREIGN KEY ("orgID") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VolunteerLog_volunteerUserID_volunteerOrgID_fkey" FOREIGN KEY ("volunteerUserID", "volunteerOrgID") REFERENCES "Volunteer" ("userID", "orgID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "VolunteerLog_volunteerUserID_volunteerOrgID_idx" ON "VolunteerLog"("volunteerUserID", "volunteerOrgID");
