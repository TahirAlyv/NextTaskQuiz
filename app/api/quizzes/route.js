import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const quizzes = await prisma.quiz.findMany();
  return NextResponse.json(quizzes);
}


export async function POST(request) {
  const data = await request.json();

   const quiz= await prisma.quiz.create({
    data:{
      title:data.title,
      questions:{
        create:data.questions.map(q=> ({
          text: q.question,
          answer: q.answer,
          options: {
            create: q.options.map(o=>({text:o}))
          }
        }))
      }
    }
   })

  return NextResponse.json(quiz);
}