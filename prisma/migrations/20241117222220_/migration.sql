/*
  Warnings:

  - You are about to drop the column `shippingMunicipality` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingZip` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingMunicipality",
DROP COLUMN "shippingZip",
ADD COLUMN     "shippingCity" TEXT,
ADD COLUMN     "shippingPostalCode" TEXT;
