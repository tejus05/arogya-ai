import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";


export async function POST(request: NextRequest) {
  try {

    const data:{id:string, isCompleted: boolean} = await request.json();

    const { id, isCompleted } = data;

    const session = await getServerSession(authOptions);

    if (!session) return new NextResponse("Unauthorised. ", { status: 401 });

    const dbUser = await prisma.user.findFirst({
      where: {
        email: session.user.email
      }
    })

    if (!dbUser) return new NextResponse("Unauthorised. ", { status: 401 });



    const response = await prisma.goals.update({
      data: {
        isCompleted: !isCompleted
      },
      where: {
        id
      }
    })


    return NextResponse.json(response);

  } catch (error) {
    // console.log(error);
    return new NextResponse("Internal Server Error. ", { status: 500 });
  }
}