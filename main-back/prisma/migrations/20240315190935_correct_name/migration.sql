/*
  Warnings:

  - You are about to drop the column `comapnyTableId` on the `OfferForCompany` table. All the data in the column will be lost.
  - Added the required column `companyTableId` to the `OfferForCompany` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OfferForCompany" DROP CONSTRAINT "OfferForCompany_comapnyTableId_fkey";

-- AlterTable
ALTER TABLE "OfferForCompany" DROP COLUMN "comapnyTableId",
ADD COLUMN     "companyTableId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OfferForCompany" ADD CONSTRAINT "OfferForCompany_companyTableId_fkey" FOREIGN KEY ("companyTableId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
