'use client'

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { PrismaClient } from '@prisma/client';

export default function QuizDetail() {
    const { id } = useParams();
    const router = useRouter();

    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null); 
    useEffect(() => {
      if (!id) return; 
    
      const fetchQuiz = async () => {
        try {
          const response = await fetch(`/api/quizzes/${id}`);
          if (!response.ok) throw new Error('Quiz tapılmadı');
          const data = await response.json();
        
          setQuiz(data);
          setAnswers(Array(data.questions.length).fill(-1));
        } catch (err) {
          console.error(err);
          router.push('/quizlist');
        }
      };
    
      fetchQuiz(); 
    }, [id, router]);

    function handleAnswerChange(qIdx, aIdx) {
        const copy = [...answers];
        copy[qIdx] = aIdx;
        setAnswers(copy);
        setSelectedOption(aIdx);  
 
    }

    function handleSubmit() {
        let correct = 0;
        answers.forEach((ans, i) => {
            if (ans === quiz.questions[i].answer) {
                ++correct;
            }
        })
        setScore(correct);
        setShowResult(true);
    }

    if (!quiz) return <p>Loading . . .</p>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
            {
                quiz.questions.map((q, i) => (
                    <div key={i} className="mb-4">
                        <p className="font-semibold">{q.question}</p>
                        {
                            q.options.map((opt, j) => (
                                <div key={j} className="flex items-center">
                                    <input
                                        type="radio"
                                        name={`q-${i}`}
                                        checked={answers[i] === j}
                                        onChange={() => handleAnswerChange(i, j)}
                                        className="mr-2"
                                    />
                                    <label>{opt.text}</label>

                                    {
                                        showResult && (
                                           <span>{
                                                opt=== q.options[q.answer] ? '✔️' :
                                                q.options[selectedOption]!== q.options[q.answer] ? '❌' : ''
                                            }</span>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                ))
            }

            {
                !showResult ? (
                    <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded mt-4">
                        Finish Quiz
                    </button>
                ) : (
                    <p className="text-xl font-bold text-blue-700 mt-4">
                        Result : {score} / {quiz.questions.length}
                    </p>
                )
            }

        </div>
    )

}