/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,name]` on the table `Offer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OfferForCompany" ADD COLUMN     "customName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Offer_categoryId_name_key" ON "Offer"("categoryId", "name");
