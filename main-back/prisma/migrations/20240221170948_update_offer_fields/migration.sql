/*
  Warnings:

  - You are about to drop the column `availability` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Offer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "availability",
DROP COLUMN "duration",
DROP COLUMN "price",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "OfferForCompany" (
    "id" TEXT NOT NULL,
    "offerTableId" TEXT NOT NULL,
    "comapnyTableId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "customImageUrl" TEXT,
    "customDescription" TEXT,

    CONSTRAINT "OfferForCompany_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OfferForCompany" ADD CONSTRAINT "OfferForCompany_offerTableId_fkey" FOREIGN KEY ("offerTableId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferForCompany" ADD CONSTRAINT "OfferForCompany_comapnyTableId_fkey" FOREIGN KEY ("comapnyTableId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
