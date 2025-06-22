import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const id = Number(params.id);

  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        include: { options: true }
      }
    }
  });

  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }

  return NextResponse.json(quiz);
}



export async function POST(request, { params }) {
  const id = Number(params.id);
  const data = await request.json();

  await prisma.question.deleteMany({
    where: { quizId: id }
  });

  const updatedQuiz = await prisma.quiz.update({
    where: { id },
    data: {
      title: data.title,
      questions: {
        create: data.questions.map(q => ({
          text: q.question,
          answer: q.answer,
          options: {
            create: q.options.map(o => ({ text: o }))
          }
        }))
      }
    },
    include: {
      questions: {
        include: { options: true }
      }
    }
  });

  return NextResponse.json(updatedQuiz);
}



