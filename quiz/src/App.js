import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это...',
    variants: ['JavaScript библиотека', 'MVC-фреймворк', 'Back-end платформа'],
    correct: 0,
  },
  {
    title: 'Какая компания разработала React?',
    variants: ['Twitter', 'Facebook', 'Microsoft'],
    correct: 1,
  },
  {
    title: 'Какое количество компонентов может быть на сайте?',
    variants: [
      'Не более 10',
      'Не более 50',
      'Неограниченное количество',
    ],
    correct: 2,
  },
];

function Result({correct}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Правильных ответов {correct} из {questions.length}.</h2>
      <a href = "/">
        <button>Пройти тест заново</button>
      </a>
    </div>
  );
}

function Game({step, question, onClickVariant}) {
  const percent = Math.round((step / questions.length) * 100);
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percent}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => (
          <li onClick={() => onClickVariant(index)} key={text}>{text}</li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const question = questions[step];

  const onClickVariant = (index) => {
    setStep(step +1);

    if (index == question.correct){
      setCorrect(correct + 1);
    }
  }

  return (
    <div className="App">
      {
        step !== questions.length ? (
        <Game step={step} question={question} onClickVariant={onClickVariant}/>
      ) : (
        <Result correct={correct}/>
      )}
    </div>
  );
}

export default App;