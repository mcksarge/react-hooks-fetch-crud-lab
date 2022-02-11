import React, { useEffect, useState } from "react";
import QuestionItem from './QuestionItem';
import QuestionForm from './QuestionForm';

function QuestionList({ questions, setQuestions }) {


  const listQuestions = questions.map((question) => {
    return (
      <QuestionItem handleUpdate={handleUpdate} question={question} onDelete={handleDelete} />
    )
  })

  function handleDelete(deletedItem){
    const newList = questions.filter((question) => question.id !== deletedItem)
    setQuestions(newList)
  }

  function handleNewItem(newItem){
    setQuestions([...questions, newItem])
  }

  function handleUpdate(id, correct){
    
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'correctIndex': correct
      })
    })
    setQuestions(questions)
  }
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        <QuestionForm onAddItem={handleNewItem} />
        {listQuestions}
      </ul>
    </section>
  );
}

export default QuestionList;
