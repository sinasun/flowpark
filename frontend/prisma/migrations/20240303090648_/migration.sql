/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Parking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Parking_name_key" ON "Parking"("name");
