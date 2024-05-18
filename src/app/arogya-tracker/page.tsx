import React from "react";
import UserInputForm from "@/components/UserInputForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/authOptions";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);
  const dbUser = await prisma.user.findUnique({
    where: {
      email: session!.user!.email!,
    },
  });
  const goals = await prisma.goals.findMany({
    where: {
      userId: dbUser!.id,
    },
  });
  return (
    <div className="text-center flex justify-center items-center flex-col bg-gray-200">
      <div className="flex flex-col gap-5 py-20 lg:text-left text-center lg:pr-10">
        <>
          {!goals && (
            <h1 className="lg:text-2xl md:text-xl text-lg font-semibold lg:text-left text-center">
              You do not have any goals. Please create one below.
            </h1>
          )}

          <Dialog>
            <DialogTrigger
              asChild
              className="flex justify-center items-center w-full text-center mx-auto mb-7"
            >
              <Button className="lg:text-xl md:text-lg text-[18px] text-muted-foreground font-normal mt-0 xl:mt-4 lg:text-left text-center bg-blue-500 text-white uppercase max-w-[400px]">
                Create A Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-blue-500 text-center flex justify-center items-center mx-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl py-5">
                  Please enter your details below:{" "}
                </DialogTitle>
                <DialogDescription>
                  <UserInputForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
        <div className="border-t border-1 border-black/60 w-full mt-5"/>
        <p className="text-4xl text-center font-semibold py-5 underline">Your Goals</p>
        <div className="flex flex-wrap justify-center items-center gap-10 px-5 pt-10">
          {goals.map((goal, i) => (
            <Link key={i} href={`/arogya-tracker/${goal.id}`}>
              <Card className="flex flex-col text-center px-20 py-16 space-y-10 shadow-lg bg-white cursor-pointer">
                <span className="text-2xl font-semibold">{i + 1}{". "}{goal.goalName}</span>
                <div className="flex flex-col justify-center items-center gap-y-2">
                  <Switch
                    id="toggle-complete"
                    checked={goal.isCompleted}
                    className="bg-gray-300"
                  />
                  <Label htmlFor="toggle-complete">Completed</Label>
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col mx-10">
                    <span className="font-medium">Start Date </span>
                    <span>{goal.startDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-col mx-10">
                    <span className="font-medium">Streaks </span>
                    <span>{goal.streaks} </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
