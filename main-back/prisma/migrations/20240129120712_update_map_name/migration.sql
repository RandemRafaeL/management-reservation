/*
  Warnings:

  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRolePrims" AS ENUM ('ADMIN', 'OWNER', 'EMPLOYEE', 'USER');

-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_userId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_id_fkey";

-- DropTable
DROP TABLE "company";

-- DropTable
DROP TABLE "employee";

-- DropTable
DROP TABLE "offer";

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "UserPrism" (
    "id" TEXT NOT NULL,
    "role" "UserRolePrims" NOT NULL DEFAULT 'USER',
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "UserPrism_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyPrims" (
    "id" TEXT NOT NULL,
    "imageId" TEXT,
    "imageUrl" TEXT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CompanyPrims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeePrims" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "phoneNumber" TEXT,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "EmployeePrims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferPrism" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,

    CONSTRAINT "OfferPrism_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPrism_username_key" ON "UserPrism"("username");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPrims_name_key" ON "CompanyPrims"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeePrims_email_key" ON "EmployeePrims"("email");

-- AddForeignKey
ALTER TABLE "CompanyPrims" ADD CONSTRAINT "CompanyPrims_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserPrism"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeePrims" ADD CONSTRAINT "EmployeePrims_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyPrims"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
