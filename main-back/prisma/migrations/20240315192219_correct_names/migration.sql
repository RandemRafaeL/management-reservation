/*
  Warnings:

  - You are about to drop the column `companyTableId` on the `OfferForCompany` table. All the data in the column will be lost.
  - You are about to drop the column `offerTableId` on the `OfferForCompany` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `OfferForCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerId` to the `OfferForCompany` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OfferForCompany" DROP CONSTRAINT "OfferForCompany_companyTableId_fkey";

-- DropForeignKey
ALTER TABLE "OfferForCompany" DROP CONSTRAINT "OfferForCompany_offerTableId_fkey";

-- AlterTable
ALTER TABLE "OfferForCompany" DROP COLUMN "companyTableId",
DROP COLUMN "offerTableId",
ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "offerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OfferForCompany" ADD CONSTRAINT "OfferForCompany_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferForCompany" ADD CONSTRAINT "OfferForCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
