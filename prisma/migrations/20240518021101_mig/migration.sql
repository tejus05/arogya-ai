/*
  Warnings:

  - You are about to drop the column `endTime` on the `FitnessSession` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `FitnessSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FitnessSession" DROP COLUMN "endTime";
ALTER TABLE "FitnessSession" DROP COLUMN "startTime";
