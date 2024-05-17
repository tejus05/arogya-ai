import ChatInput from '@/components/ChatInput'
import Messages from '@/components/Messages'
import { getServerSession } from 'next-auth';
import React from 'react'
import authOptions from '../api/auth/authOptions';
import { notFound } from 'next/navigation';
import { fetchRedis } from '@/helpers/fetchRedis';
import { messageSchemaArray } from '@/lib/validations/messageValidation';

const getChatMessages = async () => {
  try {
    const result: string[] = await fetchRedis(
      "zrange",
      `community-chat`,
      0,
      -1
    );

    const dbMessages = result.map((message) => JSON.parse(message) as Message);
    const reversedDbMessages = dbMessages.reverse();
    const messages = messageSchemaArray.safeParse(reversedDbMessages);
    if (!messages.success) return notFound();

    return messages.data;
  } catch (error) {
    return notFound();
  }
};

const Community = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  const initialMessages = await getChatMessages();
  return (
    <div>
      <ChatInput />
      <Messages
        initialMessages={initialMessages}
        sessionImage={session.user.image!}
        sessionName={session.user.name!}
        key={session.user.email!}
      />
    </div>
  )
}

export default Community