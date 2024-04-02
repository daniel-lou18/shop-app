-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imagePath" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "isSpecialOffer" BOOLEAN NOT NULL DEFAULT false,
    "isNewProduct" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "pricePaid" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
