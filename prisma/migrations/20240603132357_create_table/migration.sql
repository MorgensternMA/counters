-- CreateTable
CREATE TABLE "contadores" (
    "id" SERIAL NOT NULL,
    "color" VARCHAR,
    "contador" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contadores_pkey" PRIMARY KEY ("id")
);
