/*
  Warnings:

  - You are about to drop the column `userId` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `CustomerId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "userId",
ADD COLUMN     "CustomerId" TEXT NOT NULL,
ADD COLUMN     "userTableId" TEXT;

-- CreateTable
CREATE TABLE "CustomerTable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerTable_email_key" ON "CustomerTable"("email");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "CustomerTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userTableId_fkey" FOREIGN KEY ("userTableId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
