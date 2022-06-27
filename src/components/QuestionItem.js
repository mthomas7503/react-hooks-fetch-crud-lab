import React, { useState } from "react";

function QuestionItem({ question, onDeleteClick, onAnswerChange }) {
  const [answerIndex, setAnswerIndex] = useState(question.correctIndex)

  const { id, prompt, answers } = question;
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleAnswerChange(event) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"correctIndex": answerIndex})
    })
    .then((res)=>res.json())
    .then(() => setAnswerIndex(event.target.value))
    console.log(event.target.value)
  }
 

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={answerIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button id={id} onClick={onDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
