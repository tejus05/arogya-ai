import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";


export async function POST(request: NextRequest) {
  try {
    const formSchema = z.object({
      height: z.number(),
      weight: z.number(),
      age: z.number(),
      name: z.string().min(1)
    });

    // type TFormSchema = z.infer<typeof formSchema>;

    const data = await request.json();

    const validatedData = formSchema.safeParse(data);

    if (!validatedData.success) return new NextResponse("Bad request. ", { status: 400 });

    const { age, height, name, weight } = validatedData.data;

    const session = await getServerSession(authOptions);

    if (!session) return new NextResponse("Unauthorised. ", { status: 401 });

    const dbUser = await prisma.user.findFirst({
      where: {
        email: session.user.email
      }
    })

    if (!dbUser) return new NextResponse("Unauthorised. ", { status: 401 });



    const response = await prisma.goals.create({
      data: {
        goalName: name,
        streaks: 0,
        userId: dbUser.id
      }
    })

    const response1 = await prisma.userDetails.create({
      data: {
        height,
        weight,
        age,
        userId: dbUser.id
      },
    })


    return NextResponse.json(response);

  } catch (error) {
    // console.log(error);
    return new NextResponse("Internal Server Error. ", { status: 500 });
  }
}