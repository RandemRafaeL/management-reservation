-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('SCHEDULED', 'CANCELED', 'CONFIRMED', 'COMPLETED');

-- CreateTable
CREATE TABLE "OfferForEmployee" (
    "id" TEXT NOT NULL,
    "offerForCompanyId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "OfferForEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "offerForCompanyId" TEXT,
    "offerForEmployeeId" TEXT,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OfferForEmployee" ADD CONSTRAINT "OfferForEmployee_offerForCompanyId_fkey" FOREIGN KEY ("offerForCompanyId") REFERENCES "OfferForCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferForEmployee" ADD CONSTRAINT "OfferForEmployee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_offerForCompanyId_fkey" FOREIGN KEY ("offerForCompanyId") REFERENCES "OfferForCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_offerForEmployeeId_fkey" FOREIGN KEY ("offerForEmployeeId") REFERENCES "OfferForEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
