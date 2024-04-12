-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductVariant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT SELECT price FROM product WHERE Product.id = ProductVariant.productId,
    "imagePath" TEXT,
    "sku" TEXT NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductVariant" ("color", "createdAt", "id", "productId", "size", "sku", "stockQuantity", "updatedAt") SELECT "color", "createdAt", "id", "productId", "size", "sku", "stockQuantity", "updatedAt" FROM "ProductVariant";
DROP TABLE "ProductVariant";
ALTER TABLE "new_ProductVariant" RENAME TO "ProductVariant";
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");
CREATE UNIQUE INDEX "ProductVariant_productId_size_color_key" ON "ProductVariant"("productId", "size", "color");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
