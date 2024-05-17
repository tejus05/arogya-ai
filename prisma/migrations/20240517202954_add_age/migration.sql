/*
  Warnings:

  - Added the required column `age` to the `user_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_details" ADD COLUMN     "age" INT4 NOT NULL;
