CREATE TABLE "ContactMessage" (
  "id" TEXT PRIMARY KEY, "submissionKey" TEXT NOT NULL UNIQUE, "payloadHash" TEXT NOT NULL,
  "name" TEXT NOT NULL, "email" TEXT NOT NULL, "subject" TEXT NOT NULL, "message" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "EmailOutbox" (
  "id" TEXT PRIMARY KEY, "messageId" TEXT NOT NULL UNIQUE REFERENCES "ContactMessage"("id") ON DELETE CASCADE,
  "status" TEXT NOT NULL DEFAULT 'pending', "attempts" INTEGER NOT NULL DEFAULT 0,
  "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "providerId" TEXT, "errorCode" TEXT,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "EmailOutbox_status_nextAttemptAt_idx" ON "EmailOutbox"("status", "nextAttemptAt");
