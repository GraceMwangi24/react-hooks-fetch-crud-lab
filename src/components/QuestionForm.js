import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuestion = { prompt, answers, correctIndex };
    onAddQuestion(newQuestion);

    // Clear form
    setPrompt("");
    setAnswers(["", "", "", ""]);
    setCorrectIndex(0);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      <h4>Answers:</h4>
      {answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </label>
      ))}
      <label>
        Correct Answer Index:
        <input
          type="number"
          min="0"
          max="3"
          value={correctIndex}
          onChange={(e) => setCorrectIndex(parseInt(e.target.value, 10))}
        />
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
