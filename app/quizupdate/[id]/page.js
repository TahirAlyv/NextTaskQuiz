'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function QuizUpdate({ params }) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', ''], answer: 0 }]);
  const { id } = useParams();
  console.log('Quiz ID:', id);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizzes/${id}`);  
        if (!response.ok) throw new Error('Quiz tapılmadı');
        const data = await response.json();

        setTitle(data.title);
        setQuestions(data.questions.map(q => ({
          question: q.text, 
          options: q.options.map(o => o.text),
          answer: q.answer
        })));
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuiz();
  }, [id]);  


  function handleUpdate(e) {
    e.preventDefault();

    const fetchQuizUpdate = async () => {
      try {
        const response = await fetch(`/api/quizzes/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, questions }),
        });

        if (!response.ok) throw new Error('Quiz güncəllənə bilmədi');

        const data = await response.json();
        console.log('Quiz güncəlləndi:', data);
      } catch (error) {
        console.error('Xəta:', error);
      }
    };
    fetchQuizUpdate();

  }



    return (
        <form onSubmit={handleUpdate} className="p-6 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Quiz adı"
            className="border p-2 w-full"
          />

          {questions.map((q, i) => (
            <div key={i} className="mb-4 border p-3 rounded">
              <input
                type="text"
                value={q.question}
                onChange={(e) => {
                  const copy = [...questions];
                  copy[i].question = e.target.value;
                  setQuestions(copy);
                }}
                placeholder={`Sual ${i + 1}`}
                className="border p-2 w-full mb-2"
              />

              {q.options.map((opt, j) => (
                <div key={j} className="flex items-center mb-1">
                  <input
                    type="radio"
                    name={`correct-${i}`}
                    checked={q.answer === j}
                    onChange={() => {
                      const copy = [...questions];
                      copy[i].answer = j;
                      setQuestions(copy);
                    }}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const copy = [...questions];
                      copy[i].options[j] = e.target.value;
                      setQuestions(copy);
                    }}
                    placeholder={`Variant ${j + 1}`}
                    className="border p-2 w-full"
                  />
                </div>
              ))}
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Quiz-i Güncəllə
          </button>
        </form>

        
    )





}