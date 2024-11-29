-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "shippingMunicipality" DROP NOT NULL,
ALTER COLUMN "shippingState" DROP NOT NULL,
ALTER COLUMN "shippingStreetAddress" DROP NOT NULL,
ALTER COLUMN "shippingZip" DROP NOT NULL,
ALTER COLUMN "shippingName" DROP NOT NULL;
