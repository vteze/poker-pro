import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HandGuide = () => {
  const [selectedPosition, setSelectedPosition] = useState("UTG");

  const positions = [
    { name: "UTG", label: "Under the Gun", color: "bg-red-500" },
    { name: "MP", label: "Middle Position", color: "bg-orange-500" },
    { name: "CO", label: "Cutoff", color: "bg-yellow-500" },
    { name: "BTN", label: "Button", color: "bg-green-500" },
    { name: "SB", label: "Small Blind", color: "bg-blue-500" },
    { name: "BB", label: "Big Blind", color: "bg-purple-500" }
  ];

  const handRanges = {
    UTG: {
      premium: ["AA", "KK", "QQ", "AKs", "AKo"],
      strong: ["JJ", "TT", "AQs", "AQo", "AJs"],
      playable: ["99", "88", "ATs", "KQs", "KJs"],
      marginal: ["77", "66", "A9s", "KTs", "QJs"]
    },
    MP: {
      premium: ["AA", "KK", "QQ", "JJ", "AKs", "AKo"],
      strong: ["TT", "99", "AQs", "AQo", "AJs", "ATs"],
      playable: ["88", "77", "KQs", "KJs", "QJs", "JTs"],
      marginal: ["66", "55", "A9s", "A8s", "KTs", "K9s"]
    },
    CO: {
      premium: ["AA", "KK", "QQ", "JJ", "TT", "AKs", "AKo"],
      strong: ["99", "88", "AQs", "AQo", "AJs", "ATs", "KQs"],
      playable: ["77", "66", "KJs", "KTs", "QJs", "QTs", "JTs"],
      marginal: ["55", "44", "A9s", "A8s", "A7s", "K9s", "Q9s"]
    },
    BTN: {
      premium: ["AA", "KK", "QQ", "JJ", "TT", "99", "AKs", "AKo"],
      strong: ["88", "77", "AQs", "AQo", "AJs", "ATs", "KQs", "KJs"],
      playable: ["66", "55", "44", "KTs", "K9s", "QJs", "QTs", "JTs"],
      marginal: ["33", "22", "A9s", "A8s", "A7s", "A6s", "K8s", "Q9s"]
    },
    SB: {
      premium: ["AA", "KK", "QQ", "JJ", "AKs", "AKo"],
      strong: ["TT", "99", "AQs", "AQo", "AJs", "KQs"],
      playable: ["88", "77", "ATs", "KJs", "KTs", "QJs"],
      marginal: ["66", "55", "A9s", "A8s", "KTs", "QTs"]
    },
    BB: {
      premium: ["AA", "KK", "QQ", "JJ", "TT", "AKs", "AKo"],
      strong: ["99", "88", "AQs", "AQo", "AJs", "ATs", "KQs"],
      playable: ["77", "66", "55", "KJs", "KTs", "QJs", "QTs"],
      marginal: ["44", "33", "22", "A9s", "A8s", "K9s", "Q9s"]
    }
  };

  const getHandColorClass = (category: string) => {
    switch (category) {
      case "premium": return "bg-profit text-profit-foreground";
      case "strong": return "bg-primary text-primary-foreground";
      case "playable": return "bg-warning text-warning-foreground";
      case "marginal": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Guia de Mãos Iniciais</h1>
        <p className="text-muted-foreground">
          Selecione a posição para ver quais mãos jogar
        </p>
      </div>

      {/* Position Selector */}
      <div className="grid grid-cols-3 gap-2">
        {positions.map((position) => (
          <Button
            key={position.name}
            variant={selectedPosition === position.name ? "default" : "outline"}
            onClick={() => setSelectedPosition(position.name)}
            className={`h-12 text-xs ${
              selectedPosition === position.name ? 
              "gradient-gold text-primary-foreground shadow-glow" : ""
            }`}
          >
            <div className="text-center">
              <div className="font-bold">{position.name}</div>
              <div className="text-xs opacity-75">{position.label}</div>
            </div>
          </Button>
        ))}
      </div>

      {/* Hand Ranges */}
      <div className="space-y-4">
        {Object.entries(handRanges[selectedPosition as keyof typeof handRanges]).map(([category, hands]) => (
          <Card key={category} className="hand-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm capitalize flex items-center gap-2">
                {category === "premium" && "🔥 Premium"}
                {category === "strong" && "💪 Fortes"}
                {category === "playable" && "✅ Jogáveis"}
                {category === "marginal" && "⚠️ Marginais"}
                <Badge variant="secondary" className="ml-auto">
                  {hands.length} mãos
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {hands.map((hand, index) => (
                  <Badge 
                    key={index}
                    className={`${getHandColorClass(category)} font-mono text-sm px-3 py-1`}
                  >
                    {hand}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <Card className="hand-card">
        <CardHeader>
          <CardTitle className="text-sm">Legenda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-xs space-y-1">
            <p><span className="font-mono">s</span> = suited (mesmo naipe)</p>
            <p><span className="font-mono">o</span> = offsuit (naipes diferentes)</p>
            <p>Sem sufixo = pocket pair (par na mão)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HandGuide;