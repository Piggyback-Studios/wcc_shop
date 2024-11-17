/*
  Warnings:

  - You are about to drop the column `shippingAddressLine1` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressLine2` on the `Order` table. All the data in the column will be lost.
  - Added the required column `shippingMunicipality` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingState` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingStreetAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingZip` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingAddressLine1",
DROP COLUMN "shippingAddressLine2",
ADD COLUMN     "shippingMunicipality" TEXT NOT NULL,
ADD COLUMN     "shippingState" TEXT NOT NULL,
ADD COLUMN     "shippingStreetAddress" TEXT NOT NULL,
ADD COLUMN     "shippingZip" TEXT NOT NULL;
