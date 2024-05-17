import db from '@/db/redis';
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { Message, messageSchema } from "@/lib/validations/messageValidation";
import { nanoid } from 'nanoid';
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from '../../auth/authOptions';
import { fetchRedis } from '@/helpers/fetchRedis';

export async function POST(request: NextRequest) {
  try {
    const { text, messageId }: { text: string, messageId: string } = await request.json();
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorised", { status: 401 });

    const timestamp = Date.now();

    const dbMessagesRaw = await fetchRedis("zrange", `community-chat`, 0, -1) as string[];

    const dbMessages = dbMessagesRaw.map(message => JSON.parse(message) as Message) as Message[];

    const dbMessage = dbMessages.find(message => message.id === messageId) as Message;


    if (!dbMessage) return new NextResponse("Message does not exist. ", { status: 400 });

    const updatedMessage: Message = {
      ...dbMessage,
      text
    }

    const deletedMessage = await db.zrem(`community-chat`, dbMessage)

    if (!deletedMessage) return new NextResponse("Could not update the message. ", { status: 400 });

    await pusherServer.trigger(
      toPusherKey(`community-chat`),
      "edit_message",
      {
        messageFromSocket: updatedMessage,
      }
    )

    const data = await db.zadd(`community-chat`, {
      score: timestamp,
      member: JSON.stringify(updatedMessage)
    });

    return NextResponse.json(data);

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error. ", { status: 500 });
  }
}