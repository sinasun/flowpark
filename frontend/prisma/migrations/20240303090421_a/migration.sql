-- CreateTable
CREATE TABLE "Parking" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position1" INTEGER NOT NULL,
    "position2" INTEGER NOT NULL,
    "position3" INTEGER NOT NULL,
    "position4" INTEGER NOT NULL,
    "position5" INTEGER NOT NULL,
    "position6" INTEGER NOT NULL,
    "position7" INTEGER NOT NULL,
    "position8" INTEGER NOT NULL,

    CONSTRAINT "Parking_pkey" PRIMARY KEY ("id")
);
