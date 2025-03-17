-- This is an empty migration.
-- Rename the table from Expense to Transaction
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Copy data from the old Expense table to the new Transaction table
INSERT INTO "Transaction" ("id", "description", "category", "amount", "date", "type", "userId")
SELECT "id", "description", "category", "amount", "date", "type", "userId"
FROM "Expense";

-- Drop the old Expense table
DROP TABLE "Expense";