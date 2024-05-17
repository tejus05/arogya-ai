-- CreateTable
CREATE TABLE "Goals" (
    "id" STRING NOT NULL,
    "goalName" STRING NOT NULL,
    "isCompleted" BOOL NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "progress" INT4 NOT NULL,
    "streaks" INT4 NOT NULL,

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_details" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "height" INT4 NOT NULL,
    "weight" INT4 NOT NULL,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FitnessSession" (
    "id" STRING NOT NULL,
    "goalId" STRING NOT NULL,
    "caloriesBurnt" INT4 NOT NULL,
    "startTime" INT4 NOT NULL,
    "endTime" INT4 NOT NULL,
    "duration" INT4 NOT NULL,

    CONSTRAINT "FitnessSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessSession" ADD CONSTRAINT "FitnessSession_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
