'use client'

import Link from "next/link";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function QuizList() {
    const [quizzes, setQuizzes] = useState([]);

     useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await fetch('/api/quizzes');
                const data = await res.json();
                setQuizzes(data);
            } catch (err) {
                console.error("Quiz-lər alınarkən xəta:", err);
            }
        };

        fetchQuizzes();
    }, []);
    
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quiz List</h1>
            <Link href='/create' className="text-blue-600 underline">Create new quiz</Link>
            <ul className="mt-4 space-y-2">
                {
                    quizzes.map((q, i) => (
                         <li key={q.id}>
                             <div className="bg-white shadow p-4 rounded hover:bg-gray-100 flex justify-between items-center">
                               <Link href={`/quizlist/${q.id}`} className="text-black font-medium hover:underline">
                                 {q.title}
                               </Link>

                               <Link
                                 href={`/quizupdate/${q.id}`}
                                 className="text-blue-600 underline text-sm ml-4"
                               >
                                 Update
                               </Link>
                             </div>
                         </li>
                    ))
                }
            </ul>
        </div>
    )
}