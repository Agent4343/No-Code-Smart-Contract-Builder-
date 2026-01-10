import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  ChevronLeft,
  Check,
  X,
  Trophy,
  RotateCcw,
  BookOpen,
  Target,
} from 'lucide-react';
import { useTrainingStore } from '../../store/trainingStore';
import { courses, avatars } from '../../data/cnlopbData';
import { QuizAvatar } from '../../components/training/AIAvatar';
import type { QuizAttempt } from '../../types/training';

export default function QuizPage() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();

  const { isEnrolled, submitQuizAttempt, getProgress } = useTrainingStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const course = courses.find((c) => c.id === courseId);
  const module = course?.modules.find((m) => m.id === moduleId);
  const quiz = module?.quiz;
  const instructor = quiz ? avatars.find((a) => a.id === quiz.avatarId) : null;
  const progress = courseId ? getProgress(courseId) : null;

  // Check enrollment
  useEffect(() => {
    if (courseId && !isEnrolled(courseId)) {
      navigate(`/training/course/${course?.slug || courseId}`);
    }
  }, [courseId, isEnrolled, navigate, course?.slug]);

  // Timer
  useEffect(() => {
    if (quizStarted && quiz?.timeLimit && timeRemaining === null) {
      setTimeRemaining(quiz.timeLimit * 60);
    }
  }, [quizStarted, quiz?.timeLimit, timeRemaining]);

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0 && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, quizCompleted]);

  if (!course || !module || !quiz) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-white mb-4">Quiz not found</h2>
        <Link to="/training" className="text-blue-400 hover:text-blue-300">
          Return to training
        </Link>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestion.id];
  const isAnswerCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (answer: string) => {
    if (showExplanation) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const answers = quiz.questions.map((q) => ({
      questionId: q.id,
      answer: selectedAnswers[q.id] || '',
      correct: selectedAnswers[q.id] === q.correctAnswer,
    }));

    const correctCount = answers.filter((a) => a.correct).length;
    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    const attempt: QuizAttempt = {
      quizId: quiz.id,
      attemptNumber: (progress?.quizAttempts.filter((a) => a.quizId === quiz.id).length || 0) + 1,
      answers,
      score,
      passed,
      completedAt: new Date().toISOString(),
      timeSpent: quiz.timeLimit ? quiz.timeLimit * 60 - (timeRemaining || 0) : 0,
    };

    if (courseId) {
      submitQuizAttempt(courseId, quiz.id, attempt);
    }

    setQuizCompleted(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizCompleted(false);
    setTimeRemaining(quiz.timeLimit ? quiz.timeLimit * 60 : null);
    setQuizStarted(true);
  };

  // Calculate results
  const calculateResults = () => {
    const correctCount = quiz.questions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;
    return { correctCount, score, passed };
  };

  // Quiz Start Screen
  if (!quizStarted && !quizCompleted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Link
          to={`/training/learn/${courseId}`}
          className="text-blue-400 hover:text-blue-300 flex items-center mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Lessons
        </Link>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-purple-400" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">{quiz.title}</h1>
          <p className="text-slate-400 mb-6">{quiz.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-2xl font-bold text-white">
                {quiz.questions.length}
              </p>
              <p className="text-slate-400 text-sm">Questions</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-2xl font-bold text-white">
                {quiz.passingScore}%
              </p>
              <p className="text-slate-400 text-sm">Pass Score</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-2xl font-bold text-white">
                {quiz.timeLimit ? `${quiz.timeLimit}m` : '∞'}
              </p>
              <p className="text-slate-400 text-sm">Time Limit</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-blue-400 font-medium mb-2">Instructions:</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Answer each question to the best of your ability</li>
              <li>• You can navigate between questions</li>
              <li>• After each answer, the AI instructor will provide feedback</li>
              <li>• You need {quiz.passingScore}% or higher to pass</li>
              <li>• You have {quiz.attemptsAllowed} attempts allowed</li>
            </ul>
          </div>

          <button
            onClick={() => setQuizStarted(true)}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz Results Screen
  if (quizCompleted) {
    const { correctCount, score, passed } = calculateResults();

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              passed ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}
          >
            {passed ? (
              <Trophy className="w-12 h-12 text-green-400" />
            ) : (
              <X className="w-12 h-12 text-red-400" />
            )}
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            {passed ? 'Congratulations!' : 'Keep Learning'}
          </h1>
          <p className="text-slate-400 mb-6">
            {passed
              ? 'You have successfully passed this quiz!'
              : 'You need a bit more practice. Review the material and try again.'}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p
                className={`text-3xl font-bold ${
                  passed ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {score}%
              </p>
              <p className="text-slate-400 text-sm">Your Score</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-3xl font-bold text-white">
                {correctCount}/{quiz.questions.length}
              </p>
              <p className="text-slate-400 text-sm">Correct Answers</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-3xl font-bold text-white">
                {quiz.passingScore}%
              </p>
              <p className="text-slate-400 text-sm">Pass Score</p>
            </div>
          </div>

          {/* Question Review */}
          <div className="text-left mb-8">
            <h3 className="text-white font-semibold mb-4">Question Review:</h3>
            <div className="space-y-3">
              {quiz.questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const correct = userAnswer === question.correctAnswer;

                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border ${
                      correct
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-slate-300 text-sm">
                          Q{index + 1}: {question.question}
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                          Your answer: {userAnswer || 'Not answered'}
                        </p>
                        {!correct && (
                          <p className="text-green-400 text-xs mt-1">
                            Correct: {question.correctAnswer}
                          </p>
                        )}
                      </div>
                      {correct ? (
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            {!passed && (
              <button
                onClick={handleRetakeQuiz}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors flex items-center"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Retake Quiz
              </button>
            )}
            <Link
              to={`/training/learn/${courseId}`}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              {passed ? 'Continue Learning' : 'Review Material'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Questions Screen
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to={`/training/learn/${courseId}`}
          className="text-blue-400 hover:text-blue-300 flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Exit Quiz
        </Link>

        {timeRemaining !== null && (
          <div
            className={`flex items-center px-4 py-2 rounded-lg ${
              timeRemaining < 60
                ? 'bg-red-500/20 text-red-400'
                : 'bg-slate-700 text-white'
            }`}
          >
            <Clock className="w-4 h-4 mr-2" />
            {formatTime(timeRemaining)}
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
          <span>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
          <span>
            {Object.keys(selectedAnswers).length} answered
          </span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 rounded-full transition-all"
            style={{
              width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
        {/* Question */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                currentQuestion.difficulty === 'beginner'
                  ? 'bg-green-500/20 text-green-400'
                  : currentQuestion.difficulty === 'intermediate'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {currentQuestion.difficulty}
            </span>
            <span className="text-slate-500 text-sm">
              {currentQuestion.points} points
            </span>
          </div>
          <h2 className="text-xl text-white font-medium">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        {currentQuestion.type === 'multiple-choice' && (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQuestion.correctAnswer;
              const showResult = showExplanation;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    showResult
                      ? isCorrectOption
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : isSelected
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : 'bg-slate-700/50 border-slate-600 text-slate-400'
                      : isSelected
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center">
                    <span
                      className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 text-sm ${
                        showResult
                          ? isCorrectOption
                            ? 'border-green-500 bg-green-500 text-white'
                            : isSelected
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-slate-500'
                          : isSelected
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-slate-500'
                      }`}
                    >
                      {showResult && isCorrectOption && <Check className="w-4 h-4" />}
                      {showResult && isSelected && !isCorrectOption && (
                        <X className="w-4 h-4" />
                      )}
                      {!showResult && String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* True/False */}
        {currentQuestion.type === 'true-false' && (
          <div className="grid grid-cols-2 gap-4">
            {['true', 'false'].map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQuestion.correctAnswer;
              const showResult = showExplanation;

              return (
                <button
                  key={option}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={showExplanation}
                  className={`p-6 rounded-lg border text-center text-lg font-medium transition-all ${
                    showResult
                      ? isCorrectOption
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : isSelected
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : 'bg-slate-700/50 border-slate-600 text-slate-400'
                      : isSelected
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Avatar Explanation */}
      {showExplanation && instructor && (
        <div className="mb-6">
          <QuizAvatar
            avatar={instructor}
            isCorrect={isAnswerCorrect}
            explanation={
              isAnswerCorrect
                ? currentQuestion.explanation
                : currentQuestion.avatarExplanation
            }
            onContinue={handleNextQuestion}
          />
        </div>
      )}

      {/* Navigation */}
      {!showExplanation && (
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <button
            onClick={handleCheckAnswer}
            disabled={!selectedAnswer}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        </div>
      )}

      {/* Question Navigation Dots */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        {quiz.questions.map((q, index) => {
          const answered = selectedAnswers[q.id] !== undefined;
          const isCurrent = index === currentQuestionIndex;

          return (
            <button
              key={q.id}
              onClick={() => {
                setShowExplanation(false);
                setCurrentQuestionIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                isCurrent
                  ? 'bg-purple-500 w-6'
                  : answered
                  ? 'bg-blue-500'
                  : 'bg-slate-600'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
