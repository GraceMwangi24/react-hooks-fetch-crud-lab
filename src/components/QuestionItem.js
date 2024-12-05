import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdateCorrectIndex }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedIndex, setSelectedIndex] = useState(correctIndex);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleCorrectIndexChange = (event) => {
    const newIndex = parseInt(event.target.value, 10);
    setSelectedIndex(newIndex);
    onUpdateCorrectIndex(id, newIndex);
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedIndex} onChange={handleCorrectIndexChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
