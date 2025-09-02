import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator as CalcIcon, Percent, DollarSign } from "lucide-react";

const Calculator = () => {
  const [potSize, setPotSize] = useState("");
  const [betSize, setBetSize] = useState("");
  const [outs, setOuts] = useState("");

  const calculatePotOdds = () => {
    if (!potSize || !betSize) return null;
    const pot = parseFloat(potSize);
    const bet = parseFloat(betSize);
    if (pot <= 0 || bet <= 0) return null;
    
    const totalPot = pot + bet;
    const ratio = bet / totalPot;
    return {
      ratio: ratio * 100,
      decimal: `${bet}:${totalPot}`,
      recommendation: ratio <= 0.33 ? "CALL" : ratio <= 0.5 ? "MARGINAL" : "FOLD"
    };
  };

  const calculateEquity = () => {
    if (!outs) return null;
    const outsNum = parseInt(outs);
    if (outsNum <= 0 || outsNum > 50) return null;
    
    // Rule of 4 and 2
    const turnEquity = (outsNum * 4) - (outsNum - 8);
    const riverEquity = outsNum * 2;
    
    return {
      turn: Math.max(turnEquity, 0),
      river: riverEquity,
      combined: Math.min(outsNum * 4, 100)
    };
  };

  const potOdds = calculatePotOdds();
  const equity = calculateEquity();

  const commonOuts = [
    { name: "Flush Draw", outs: 9, description: "9 cartas do mesmo naipe" },
    { name: "Open-ended Straight", outs: 8, description: "8 cartas para sequência" },
    { name: "Gutshot", outs: 4, description: "4 cartas para sequência interna" },
    { name: "Two Pair to Full House", outs: 4, description: "4 cartas para full house" },
    { name: "Set to Full/Quads", outs: 7, description: "7 cartas para melhorar" },
    { name: "Flush + Straight", outs: 15, description: "Combo draw" }
  ];

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <CalcIcon className="h-6 w-6 text-primary" />
          Calculadora de Odds
        </h1>
        <p className="text-muted-foreground">
          Calcule pot odds e equity para tomar decisões matemáticas
        </p>
      </div>

      {/* Pot Odds Calculator */}
      <Card className="stat-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Pot Odds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pot-size">Tamanho do Pote ($)</Label>
              <Input
                id="pot-size"
                type="number"
                placeholder="100"
                value={potSize}
                onChange={(e) => setPotSize(e.target.value)}
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bet-size">Aposta a Pagar ($)</Label>
              <Input
                id="bet-size"
                type="number"
                placeholder="50"
                value={betSize}
                onChange={(e) => setBetSize(e.target.value)}
                className="bg-input border-border"
              />
            </div>
          </div>

          {potOdds && (
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pot Odds:</span>
                <span className="font-semibold">{potOdds.ratio.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Razão:</span>
                <span className="font-mono">{potOdds.decimal}</span>
              </div>
              <Badge className={`w-full justify-center text-sm font-semibold ${
                potOdds.recommendation === "CALL" ? "bg-profit text-profit-foreground" :
                potOdds.recommendation === "MARGINAL" ? "bg-warning text-warning-foreground" :
                "bg-loss text-loss-foreground"
              }`}>
                {potOdds.recommendation}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Equity Calculator */}
      <Card className="stat-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Percent className="h-5 w-5 text-primary" />
            Equity Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="outs">Número de Outs</Label>
            <Input
              id="outs"
              type="number"
              placeholder="9"
              value={outs}
              onChange={(e) => setOuts(e.target.value)}
              className="bg-input border-border"
              min="1"
              max="50"
            />
          </div>

          {equity && (
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">No Turn:</span>
                <span className="font-semibold">{equity.turn}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">No River:</span>
                <span className="font-semibold">{equity.river}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Turn + River:</span>
                <span className="font-semibold text-primary">{equity.combined}%</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Common Outs Reference */}
      <Card className="hand-card">
        <CardHeader>
          <CardTitle className="text-lg">Referência Rápida de Outs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commonOuts.map((draw, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-between h-auto p-3"
                onClick={() => setOuts(draw.outs.toString())}
              >
                <div className="text-left">
                  <div className="font-medium">{draw.name}</div>
                  <div className="text-xs text-muted-foreground">{draw.description}</div>
                </div>
                <Badge variant="secondary" className="ml-2">
                  {draw.outs} outs
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;