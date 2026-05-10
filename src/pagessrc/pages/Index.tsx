import { useState, useCallback } from "react";
import { questions, calculateResult } from "@/data/quizData";
import IntroScreen from "@/components/quiz/IntroScreen";
import QuestionScreen from "@/components/quiz/QuestionScreen";
import ResultScreen from "@/components/quiz/ResultScreen";
import ProgressBar from "@/components/quiz/ProgressBar";

type Screen = "intro" | "question" | "result";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
const fbq = (...args: unknown[]) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleStart = useCallback(() => {
    setScreen("question");
    setCurrentQ(0);
    fbq("trackCustom", "QuizStarted");
  }, []);

  const handleSelect = useCallback((questionId: string, letter: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: letter }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      fbq("trackCustom", "QuizQuestionAnswered", { question: currentQ + 1 });
    } else {
      setScreen("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
      fbq("track", "Lead");
      fbq("trackCustom", "QuizCompleted");
    }
  }, [currentQ]);

  const resultData = screen === "result" ? calculateResult(answers) : null;

  return (
    <div className="relative z-10 min-h-screen">
      {screen === "question" && (
        <ProgressBar current={currentQ + 1} total={questions.length} />
      )}
      <div className="max-w-[680px] mx-auto px-6 pb-20">
        {screen === "intro" && <IntroScreen onStart={handleStart} />}
        {screen === "question" && (
          <QuestionScreen
            question={questions[currentQ]}
            selectedAnswer={answers[questions[currentQ].id]}
            onSelect={handleSelect}
            onNext={handleNext}
            isLast={currentQ === questions.length - 1}
          />
        )}
        {screen === "result" && resultData && (
          <ResultScreen result={resultData.result} pct={resultData.pct} />
        )}
      </div>
    </div>
  );
};

export default Index;
