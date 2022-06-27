import React, { useEffect, useState} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
const [questions, setQuestions] = useState([])
const [deletedQuestion, setDeletedQuestion] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then((r) => r.json())
    .then((q) => setQuestions(q))
  }, [deletedQuestion])

  function handleDeleteClick(event) {
    fetch(`http://localhost:4000/questions/${event.target.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      })
      .then((res) => res.json())
      .then((deletion) => {console.log(deletedQuestion); setDeletedQuestion(deletion)})
}


  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((q) => <QuestionItem onDeleteClick={handleDeleteClick} key={q.id} question={q}/>)}</ul>
    </section>
  );
}

export default QuestionList;
