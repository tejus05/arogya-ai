/*
  Warnings:

  - Added the required column `userId` to the `Goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goals" ADD COLUMN     "userId" STRING NOT NULL;
