import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, BookOpen, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

const Coach = () => {
  const [selectedTopic, setSelectedTopic] = useState("ranges");

  const topics = [
    { id: "ranges", label: "Ranges", icon: Target },
    { id: "gto", label: "GTO", icon: Brain },
    { id: "exploitative", label: "Explorative", icon: Lightbulb },
    { id: "icm", label: "ICM", icon: BookOpen }
  ];

  const quizzes = {
    ranges: [
      {
        question: "Com que range você deve abrir no UTG em um jogo 6-max?",
        options: ["22+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, ATo+, KJo+", "66+, A9s+, KTs+, QTs+, JTs, AJo+, KQo", "88+, ATs+, KQs, AQo+"],
        correct: 1,
        explanation: "No UTG, devemos ser tight. Range ideal: 66+, A9s+, KTs+, QTs+, JTs, AJo+, KQo (cerca de 15% das mãos)."
      },
      {
        question: "Qual a diferença entre range linear e polarizado?",
        options: ["Linear tem mais blefes", "Linear tem mãos consecutivas em força, polarizado tem nuts e blefes", "Não há diferença"],
        correct: 1,
        explanation: "Range linear tem mãos consecutivas (nuts, strong, medium). Polarizado tem nuts e blefes, sem mãos médias."
      }
    ],
    gto: [
      {
        question: "O que significa jogar GTO?",
        options: ["Sempre blefar", "Estratégia matematicamente ótima que não pode ser explorada", "Jogar apenas nuts"],
        correct: 1,
        explanation: "GTO (Game Theory Optimal) é a estratégia matematicamente perfeita que maximiza EV independente da estratégia do oponente."
      }
    ],
    exploitative: [
      {
        question: "Contra um jogador muito tight (VPIP 12%), qual ajuste fazer?",
        options: ["Blefar mais", "Jogar mais tight também", "Dar mais value bet com mãos médias"],
        correct: 0,
        explanation: "Contra players tight, devemos blefar mais pois eles foldam muito. Também podemos roubar mais blinds."
      }
    ],
    icm: [
      {
        question: "O que é pressão ICM?",
        options: ["Apostar muito", "Situação onde stacks médios evitam confrontos por causa dos pay jumps", "Jogar só premium"],
        correct: 1,
        explanation: "Pressão ICM acontece próximo aos pay jumps, onde stacks médios evitam riscos desnecessários."
      }
    ]
  };

  const tips = [
    {
      type: "success",
      icon: CheckCircle2,
      title: "Parabéns! 🎉",
      message: "Você está melhorando! Sua taxa de acerto nos quizzes subiu para 78% esta semana."
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Atenção ao Tilt",
      message: "Detectamos 3 sessões com resultados negativos seguidas. Considere fazer uma pausa."
    },
    {
      type: "tip",
      icon: Lightbulb,
      title: "Dica do Dia",
      message: "Em posição, você pode jogar mais mãos especulativas como suited connectors."
    }
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuizData = quizzes[selectedTopic as keyof typeof quizzes];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    const maxQuestions = currentQuizData.length;
    setCurrentQuiz((prev) => (prev + 1) % maxQuestions);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          AI Coach
        </h1>
        <p className="text-muted-foreground">
          Treine sua teoria e receba insights personalizados
        </p>
      </div>

      {/* AI Insights */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Insights Personalizados</h2>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <Card key={index} className="hand-card">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <tip.icon className={`h-5 w-5 mt-0.5 ${
                    tip.type === 'success' ? 'text-profit' :
                    tip.type === 'warning' ? 'text-warning' :
                    'text-primary'
                  }`} />
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

      {/* Quiz Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Quiz de Teoria</h2>
        
        {/* Topic Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {topics.map((topic) => (
            <Button
              key={topic.id}
              variant={selectedTopic === topic.id ? "default" : "outline"}
              onClick={() => {
                setSelectedTopic(topic.id);
                setCurrentQuiz(0);
                setSelectedAnswer(null);
                setShowExplanation(false);
              }}
              className={`flex-shrink-0 ${
                selectedTopic === topic.id 
                  ? "gradient-gold text-primary-foreground" 
                  : ""
              }`}
            >
              <topic.icon className="h-4 w-4 mr-2" />
              {topic.label}
            </Button>
          ))}
        </div>

        {/* Quiz Card */}
        <Card className="stat-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                Questão {currentQuiz + 1} de {currentQuizData.length}
              </CardTitle>
              <Badge variant="secondary">
                {selectedTopic.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm font-medium leading-relaxed">
              {currentQuizData[currentQuiz].question}
            </p>
            
            <div className="space-y-2">
              {currentQuizData[currentQuiz].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full text-left justify-start h-auto p-3 whitespace-normal ${
                    showExplanation && index === currentQuizData[currentQuiz].correct
                      ? "border-profit bg-profit/10"
                      : showExplanation && selectedAnswer === index && index !== currentQuizData[currentQuiz].correct
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
                  <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium mb-1">Explicação:</p>
                    <p className="text-xs text-muted-foreground">
                      {currentQuizData[currentQuiz].explanation}
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