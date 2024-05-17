import db from '@/db/redis';
import { Message, messageSchema } from "@/lib/validations/messageValidation";
import { nanoid } from 'nanoid';
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from '../auth/authOptions';
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { fetchRedis } from '@/helpers/fetchRedis';

export async function POST(request: NextRequest) {
  try {
    const { text }: { text: string, chatId: string } = await request.json();
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorised", { status: 401 });

    const timestamp = Date.now();

    const sender = session.user;

    const messageData: Message = {
      id: nanoid(),
      senderName: sender.name!,
      text,
      timestamp
    }

    const messageValidation = messageSchema.safeParse(messageData);

    if (!messageValidation.success) return new NextResponse("Invalid message format. ", { status: 400 });

    const message = messageValidation.data;

    await pusherServer.trigger(
      (
        toPusherKey(`community-chat`)
      ),
      'new_message',
      {
        ...message,
        senderImage: sender.image,
        senderName: sender.name,
      }
    )

    const data = await db.zadd(`community-chat`, {
      score: timestamp,
      member: JSON.stringify(message)
    })

    return NextResponse.json(data);

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error. ", { status: 500 });
  }
}