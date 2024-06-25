-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_id_fkey";

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
