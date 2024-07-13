import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import questions from './Questionnaire.json';

const ProgressBar = ({ answered, total }) => {
  const progress = (answered / total) * 100;
  return (
    <motion.div layout className='flex items-center w-full gap-2 mb-4'>
      <div className='flex w-full h-4 bg-gray-200 rounded-full'>
        <motion.div
          layout
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className='h-full bg-blue-500 rounded-full'
          transition={{ duration: 0.9 }}
        />
      </div>
      <div className='flex text-sm text-right'>{progress.toFixed(0)}%</div>
    </motion.div>
  );
};

const Question = ({ question, options, onAnswer, answer, type }) => {
  const [localAnswer, setLocalAnswer] = useState(answer || '');

  useEffect(() => {
    setLocalAnswer(answer || '');
  }, [answer]);

  const handleConfirm = () => {
    onAnswer(localAnswer);
  };

  return (
    <div>
      <h2 className='mb-4 text-xl'>{question}</h2>
      {type === 'text' ? (
        <>
          <textarea
            className='w-full p-2 border rounded'
            value={localAnswer}
            onChange={(e) => setLocalAnswer(e.target.value)}
          />
          <button
            className='w-full p-2 mt-2 text-white bg-green-500 rounded'
            onClick={handleConfirm}
            disabled={!localAnswer.trim()}
          >
            Confirm
          </button>
        </>
      ) : (
        options.map((option, index) => (
          <div key={index} className='mb-2'>
            <button
              className={`w-full p-2 border rounded-full hover:bg-blue-100  ${
                answer === option ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
              onClick={() => onAnswer(option)}
            >
              {option}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const calculateSectionProgress = (questions, answers, section) => {
  const sectionQuestions = questions.filter((q) => q.section === section);
  const answeredQuestions = sectionQuestions.filter((q) => answers[q.key]);
  return {
    answered: answeredQuestions.length,
    total: sectionQuestions.length,
  };
};

const StatusPanel = ({
  questions,
  answers,
  onJumpToQuestion,
  currentQuestion,
}) => {
  const sections = [...new Set(questions.map((q) => q.section))];

  return (
    <div className='mb-4 top-4 bottom-4 lg:fixed left-4 lg:m-0'>
      <div className='flex flex-col items-start justify-center bg-gray-100 p-[14px] lg:p-[28px] rounded-[14px] lg:rounded-[28px]'>
        {sections.map((section) => {
          const { answered, total } = calculateSectionProgress(
            questions,
            answers,
            section,
          );
          return (
            <div key={section}>
              <h3 className='mb-2 text-lg'>
                {section} ({answered}/{total})
              </h3>
              <div className='flex flex-wrap gap-2 mb-4'>
                {questions
                  .map((q, index) => ({ ...q, index }))
                  .filter((q) => q.section === section)
                  .map((q, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 cursor-pointer rounded-full ${
                        answers[q.key] ? 'bg-green-500 ' : 'bg-gray-200'
                      } ${
                        currentQuestion === q.index
                          ? 'ring-2 ring-green-500 ring-offset-2'
                          : ''
                      }`}
                      onClick={() => onJumpToQuestion(q.index)}
                    ></div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReviewAnswers = ({ questions, answers, onEditAnswer }) => {
  return (
    <div className='flex flex-col'>
      <h2 className='flex flex-col gap-8 mb-4 text-xl'>Review your answers</h2>
      {questions.map((question, index) => (
        <div
          key={index}
          className='flex flex-col mb-8 bg-gray-100 p-[14px] gap-4 rounded-[14px]'
        >
          <h3 className='flex text-lg md:text-xl lg:text-2xl bold'>
            {question.question}
          </h3>
          <div className='flex items-center gap-4'>
            <strong className='flex '>Your Anwser:</strong>
            <p className='flex 2'> {answers[question.key]}</p>
            <button
              className='inline-flex px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-100'
              onClick={() => onEditAnswer(index)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    const savedAnswers = JSON.parse(
      localStorage.getItem('aiComplianceAnswers'),
    );
    if (savedAnswers) {
      setAnswers(savedAnswers);
      const lastQuestionIndex = Object.keys(savedAnswers).length;
      if (lastQuestionIndex === questions.length) {
        setIsReviewing(true);
      } else {
        setCurrentQuestion(lastQuestionIndex);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('aiComplianceAnswers', JSON.stringify(answers));
    }
    if (Object.keys(answers).length === questions.length) {
      setIsReviewing(true);
    }
  }, [answers]);

  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => {
      const newAnswers = {
        ...prevAnswers,
        [questions[currentQuestion].key]: answer,
      };
      localStorage.setItem('aiComplianceAnswers', JSON.stringify(newAnswers));
      return newAnswers;
    });
    if (Object.keys(answers).length === questions.length) {
      setIsReviewing(true);
    } else if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setIsReviewing(false);
    localStorage.removeItem('aiComplianceAnswers');
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestion(index);
    setIsReviewing(false);
  };

  const handleEditAnswer = (index) => {
    setCurrentQuestion(index);
    setIsReviewing(false);
  };

  const handleSubmit = () => {
    console.log('Answers submitted:', answers);
    localStorage.removeItem('aiComplianceAnswers');
    // Handle form submission logic here
  };

  const answeredQuestions = Object.keys(answers).length;

  return (
    <div className='flex flex-col max-w-xl p-4 mx-auto lg:ml-[25vw] md:max-w-4xl lg:max-w-7xl'>
      <StatusPanel
        questions={questions}
        answers={answers}
        onJumpToQuestion={handleJumpToQuestion}
        currentQuestion={currentQuestion}
      />

      <ProgressBar answered={answeredQuestions} total={questions.length} />
      {!isReviewing ? (
        <>
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Question
              question={questions[currentQuestion].question}
              options={questions[currentQuestion].options}
              onAnswer={handleAnswer}
              answer={answers[questions[currentQuestion].key]}
              type={questions[currentQuestion].type}
            />
          </motion.div>
          <div className='flex justify-between mt-4'>
            <button
              className='px-4 py-2 text-white bg-gray-500 rounded'
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              className='px-4 py-2 text-white bg-blue-500 rounded'
              onClick={handleNext}
              disabled={currentQuestion >= questions.length - 1}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center gap-8'>
          <ReviewAnswers
            questions={questions}
            answers={answers}
            onEditAnswer={handleEditAnswer}
          />
          <div className='flex items-center justify-between w-full my-4'>
            <button
              className='flex px-4 py-2 text-white bg-gray-500 rounded'
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className='flex px-4 py-2 text-white bg-green-500 rounded'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
