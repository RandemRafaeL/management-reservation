/*
  Warnings:

  - You are about to drop the column `CustomerId` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_CustomerId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "CustomerId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CustomerTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
