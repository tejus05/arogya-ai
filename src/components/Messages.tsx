"use client";

import { toPusherKey } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

import { pusherClient } from "@/lib/pusher";
import { useRouter } from "next/navigation";
import MessageElement from "./Message";
import { Message } from "@/lib/validations/messageValidation";

interface MessagesProps {
  initialMessages: Message[];
  sessionName: string;
  sessionImage: string;
}

const Messages = ({
  initialMessages,
  sessionName,
  sessionImage,
}: MessagesProps) => {
  const scrolldownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`community-chat`));

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev]);
    };

    pusherClient.bind("incoming_message", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`community-chat`));

      pusherClient.unbind("incoming_message", messageHandler);
    };
  }, [router]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return "";
  }
  console.log(messages);

  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div ref={scrolldownRef} />
      {messages.map((message, index) => {
        const isCurrentUser = message.senderName === sessionName;

        const lastMessage = messages[0];

        const isLastMessage = message.id === lastMessage.id;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderName === messages[index].senderName;

        return (
          <MessageElement
            key={message.id}
            hasNextMessageFromSameUser={hasNextMessageFromSameUser}
            isCurrentUser={isCurrentUser}
            message={message}
            sessionImage={sessionImage}
          />
        );
      })}
    </div>
  );
};

export default Messages;
