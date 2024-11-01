-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventName" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "timeOfEvent" DATETIME NOT NULL,
    "placeOfEvent" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Following" (
    "userID" TEXT NOT NULL,
    "orgID" TEXT NOT NULL,
    "receiveEmails" BOOLEAN NOT NULL DEFAULT true,
    "receiveAlerts" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("userID", "orgID"),
    CONSTRAINT "Following_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Following_orgID_fkey" FOREIGN KEY ("orgID") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_organizationName_key" ON "Organization"("organizationName");

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventName_key" ON "Event"("eventName");
