'use server'

import { auth } from '@clerk/nextjs/server';
import { prisma } from '../../lib/prisma';

export async function sendMessage(conversationId: string, content: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const message = await prisma.message.create({
    data: {
      content,
      conversation: { connect: { id: conversationId } },
      sender: { connect: { id: userId } },
    },
  });

  return message;
}

export async function getMessages(conversationId: string) {
  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
    include: { sender: true },
  });

  return messages;
}
