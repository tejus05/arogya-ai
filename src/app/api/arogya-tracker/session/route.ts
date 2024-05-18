import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";


export async function POST(request: NextRequest) {
  try {

    const data: { time: string, goalId: string } = await request.json();

    const { time, goalId } = data;

    const [hours, minutes, seconds] = time.split(":");

    // @ts-ignore
    const finalSeconds = Number(hours*60*60) + Number(minutes*60) + Number(seconds);

    const session = await getServerSession(authOptions);

    if (!session) return new NextResponse("Unauthorised. ", { status: 401 });

    const dbUser = await prisma.user.findFirst({
      where: {
        email: session.user.email
      }
    })

    if (!dbUser) return new NextResponse("Unauthorised. ", { status: 401 });

    const userDetails = await prisma.userDetails.findFirst({
      where: {
        userId: dbUser.id
      }
    })

    if (!userDetails) return new NextResponse("User details not found. ", { status: 404 });

    const { weight, height, age } = userDetails;
    const MET = 6;
    const BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    const caloriesBurntMinute = BMR * MET / (24 * 60);
    const caloriesBurnt = caloriesBurntMinute * finalSeconds;


    const response = await prisma.fitnessSession.create({
      data: {
        caloriesBurnt,
        duration: finalSeconds,
        goalId
      },
    })

    const goal = await prisma.goals.findUnique({
      where: {
        id: goalId
      }
    })

    if (!goal) return new NextResponse("Goal not found. ", { status: 404 });
    
    
    const currentDate = new Date();
    const lastUpdated = new Date(goal.lastUpdated)

    if (currentDate.getDate() !== lastUpdated.getDate() ||
      currentDate.getMonth() !== lastUpdated.getMonth() ||
      currentDate.getFullYear() !== lastUpdated.getFullYear()) {
      await prisma.goals.update({
        where: {
          id: goalId
        },
        data: {
          streaks: {
            increment: 1
          },
          lastUpdated: currentDate
        }
      })
    }


    return NextResponse.json(response);

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error. ", { status: 500 });
  }
}