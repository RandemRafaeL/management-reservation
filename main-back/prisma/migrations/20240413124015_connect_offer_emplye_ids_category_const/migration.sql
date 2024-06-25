/*
  Warnings:

  - A unique constraint covering the columns `[employeeId,offerForCompanyId]` on the table `OfferForEmployee` will be added. If there are existing duplicate values, this will fail.
  - Made the column `categoryId` on table `Offer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_categoryId_fkey";

-- AlterTable
ALTER TABLE "Offer" ALTER COLUMN "categoryId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OfferForEmployee_employeeId_offerForCompanyId_key" ON "OfferForEmployee"("employeeId", "offerForCompanyId");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryOfOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
