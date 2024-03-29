-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Product" (
    "productid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT[],
    "datePosted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "rentPrice" INTEGER NOT NULL,
    "softDelStat" BOOLEAN NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productid")
);

-- CreateTable
CREATE TABLE "ProductSold" (
    "productsold_id" SERIAL NOT NULL,
    "buyerid" INTEGER NOT NULL,
    "sellerid" INTEGER NOT NULL,
    "productid" INTEGER NOT NULL,
    "dateSold" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductSold_pkey" PRIMARY KEY ("productsold_id")
);

-- CreateTable
CREATE TABLE "ProductRent" (
    "productrent_id" SERIAL NOT NULL,
    "rentfrom_id" INTEGER NOT NULL,
    "rentto_id" INTEGER NOT NULL,
    "productid" INTEGER NOT NULL,
    "rentdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duedate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductRent_pkey" PRIMARY KEY ("productrent_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSold_productid_key" ON "ProductSold"("productid");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSold" ADD CONSTRAINT "ProductSold_buyerid_fkey" FOREIGN KEY ("buyerid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSold" ADD CONSTRAINT "ProductSold_sellerid_fkey" FOREIGN KEY ("sellerid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSold" ADD CONSTRAINT "ProductSold_productid_fkey" FOREIGN KEY ("productid") REFERENCES "Product"("productid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRent" ADD CONSTRAINT "ProductRent_rentfrom_id_fkey" FOREIGN KEY ("rentfrom_id") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRent" ADD CONSTRAINT "ProductRent_rentto_id_fkey" FOREIGN KEY ("rentto_id") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRent" ADD CONSTRAINT "ProductRent_productid_fkey" FOREIGN KEY ("productid") REFERENCES "Product"("productid") ON DELETE RESTRICT ON UPDATE CASCADE;
