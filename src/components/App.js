import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions on initial load
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  // Add new question
  const addQuestion = (newQuestion) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => setQuestions([...questions, data]));
  };

  // Delete question
  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => setQuestions(questions.filter((q) => q.id !== id)));
  };

  // Update correct index
  const updateCorrectIndex = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedQuestions = questions.map((q) =>
          q.id === id ? data : q
        );
        setQuestions(updatedQuestions);
      });
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={deleteQuestion}
          onUpdateCorrectIndex={updateCorrectIndex}
        />
      )}
    </main>
  );
}

export default App;
