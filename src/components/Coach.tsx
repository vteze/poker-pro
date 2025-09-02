import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { questions } from "@/data/coachQuestions";

const Coach = () => {
  const [questionOrder] = useState(() => [...questions].sort(() => Math.random() - 0.5));
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const stats = [
    { label: "VPIP", value: "25%" },
    { label: "PFR", value: "20%" },
    { label: "3-Bet", value: "7%" },
    { label: "Aggression", value: "2.3" },
    { label: "Hands Jogadas", value: "1200" },
    { label: "Winrate (bb/100)", value: "4.2" }
  ];

  const tips = [
    {
      type: "success",
      icon: "✅",
      title: "Parabéns! 🎉",
      message: "Você está melhorando! Sua taxa de acerto nos quizzes subiu para 78% esta semana."
    },
    {
      type: "warning",
      icon: "⚠️",
      title: "Atenção ao Tilt",
      message: "Detectamos 3 sessões com resultados negativos seguidas. Considere fazer uma pausa."
    },
    {
      type: "tip",
      icon: "💡",
      title: "Dica do Dia",
      message: "Em posição, você pode jogar mais mãos especulativas como suited connectors."
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    const maxQuestions = questionOrder.length;
    setCurrentQuiz((prev) => (prev + 1) % maxQuestions);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const currentQuestion = questionOrder[currentQuiz];

  return (
    <div className="min-h-screen bg-background p-4 space-y-6 pb-20">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">🧠 AI Coach</h1>
        <p className="text-muted-foreground">
          Treine sua teoria e receba insights personalizados
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Estatísticas do Jogador</h2>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, idx) => (
            <Card key={idx} className="p-4">
              <p className="text-sm font-semibold">{stat.label}</p>
              <p className="text-lg">{stat.value}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Insights Personalizados</h2>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <Card key={index} className="hand-card">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{tip.icon}</span>
                  <div>
                    <h3 className="font-semibold mb-1">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Quiz de Teoria</h2>
        <Card className="stat-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                Questão {currentQuiz + 1} de {questionOrder.length}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm font-medium leading-relaxed">
              {currentQuestion.question}
            </p>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full text-left justify-start h-auto p-3 whitespace-normal ${
                    showExplanation && index === currentQuestion.correct
                      ? "border-profit bg-profit/10"
                      : showExplanation && selectedAnswer === index && index !== currentQuestion.correct
                      ? "border-loss bg-loss/10"
                      : ""
                  }`}
                >
                  <span className="text-xs font-bold mr-3 flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-sm">{option}</span>
                </Button>
              ))}
            </div>

            {showExplanation && (
              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5">💡</span>
                  <div>
                    <p className="text-sm font-medium mb-1">Explicação:</p>
                    <p className="text-xs text-muted-foreground">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {showExplanation && (
              <Button
                onClick={nextQuestion}
                className="w-full gradient-gold text-primary-foreground"
              >
                Próxima Questão
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Coach;
