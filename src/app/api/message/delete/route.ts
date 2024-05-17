import db from '@/db/redis';
import { fetchRedis } from '@/helpers/fetchRedis';
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { Message } from "@/lib/validations/messageValidation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

export async function POST(request: NextRequest) {
  try {
    const { chatId, messageId }: { text: string, chatId: string, messageId: string } = await request.json();
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorised", { status: 401 });

    const dbMessagesRaw = await fetchRedis("zrange", `community-chat`, 0, -1) as string[];

    const dbMessages = dbMessagesRaw.map(message => JSON.parse(message) as Message) as Message[];

    const dbMessage = dbMessages.find(message => message.id === messageId) as Message;

    if (!dbMessage) return new NextResponse("Message does not exist. ", { status: 400 });


    await pusherServer.trigger(
      toPusherKey(`community-chat`),
      "delete_message",
      {
        deletedMessageId: dbMessage.id
      }
    )

    const deletedMessage = await db.zrem(`community-chat`, dbMessage)


    return NextResponse.json(deletedMessage);

  } catch (error) {
    return new NextResponse("Internal Server Error. ", { status: 500 });
  }
}