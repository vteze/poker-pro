import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Calendar, Clock, Target } from "lucide-react";

const History = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const periods = [
    { id: "week", label: "7 dias" },
    { id: "month", label: "30 dias" },
    { id: "all", label: "Todos" }
  ];

  const sessions = [
    {
      id: 1,
      date: "2024-01-15",
      time: "19:30",
      type: "NL50 Cash Game",
      duration: "2h 45m",
      hands: 234,
      profit: 125,
      vpip: 18,
      pfr: 14,
      aggression: 2.1
    },
    {
      id: 2,
      date: "2024-01-14",
      time: "21:00",
      type: "NL25 Cash Game",
      duration: "1h 30m",
      hands: 187,
      profit: -45,
      vpip: 22,
      pfr: 16,
      aggression: 1.8
    },
    {
      id: 3,
      date: "2024-01-14",
      time: "15:15",
      type: "Tournament $11",
      duration: "3h 45m",
      hands: 156,
      profit: 280,
      vpip: 16,
      pfr: 12,
      aggression: 2.5
    },
    {
      id: 4,
      date: "2024-01-13",
      time: "20:00",
      type: "NL100 Cash Game",
      duration: "1h 50m",
      hands: 203,
      profit: 95,
      vpip: 19,
      pfr: 15,
      aggression: 2.0
    }
  ];

  const totalStats = {
    totalProfit: sessions.reduce((sum, s) => sum + s.profit, 0),
    totalHands: sessions.reduce((sum, s) => sum + s.hands, 0),
    totalTime: "9h 50m",
    avgVPIP: sessions.reduce((sum, s) => sum + s.vpip, 0) / sessions.length,
    avgPFR: sessions.reduce((sum, s) => sum + s.pfr, 0) / sessions.length,
    avgAggression: sessions.reduce((sum, s) => sum + s.aggression, 0) / sessions.length
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Histórico de Sessões
        </h1>
        <p className="text-muted-foreground">
          Acompanhe sua evolução e performance
        </p>
      </div>

      {/* Period Filter */}
      <div className="flex gap-2">
        {periods.map((period) => (
          <Button
            key={period.id}
            variant={selectedPeriod === period.id ? "default" : "outline"}
            onClick={() => setSelectedPeriod(period.id)}
            className={`flex-1 ${
              selectedPeriod === period.id 
                ? "gradient-gold text-primary-foreground" 
                : ""
            }`}
          >
            {period.label}
          </Button>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="stat-card">
        <CardHeader>
          <CardTitle className="text-lg">Resumo do Período</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Lucro Total:</span>
                <span className={`font-semibold ${
                  totalStats.totalProfit >= 0 ? 'text-profit' : 'text-loss'
                }`}>
                  {totalStats.totalProfit >= 0 ? '+' : ''}${totalStats.totalProfit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Mãos:</span>
                <span className="font-semibold">{totalStats.totalHands}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tempo:</span>
                <span className="font-semibold">{totalStats.totalTime}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">VPIP médio:</span>
                <span className="font-semibold">{totalStats.avgVPIP.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">PFR médio:</span>
                <span className="font-semibold">{totalStats.avgPFR.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Agressão:</span>
                <span className="font-semibold">{totalStats.avgAggression.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sessions List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Sessões Recentes</h2>
        <div className="space-y-3">
          {sessions.map((session) => (
            <Card key={session.id} className="hand-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{session.type}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {session.date}
                      <Clock className="h-3 w-3 ml-2" />
                      {session.time}
                    </div>
                  </div>
                  <div className={`text-right ${
                    session.profit > 0 ? 'text-profit' : 'text-loss'
                  }`}>
                    <p className="font-bold text-lg">
                      {session.profit > 0 ? '+' : ''}${session.profit}
                    </p>
                    <div className="flex items-center gap-1">
                      {session.profit > 0 ? 
                        <TrendingUp className="h-3 w-3" /> : 
                        <TrendingDown className="h-3 w-3" />
                      }
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">
                      {session.duration} • {session.hands} mãos
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      VPIP {session.vpip}%
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      PFR {session.pfr}%
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      AGG {session.aggression}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Action */}
      <Button className="w-full h-12 gradient-gold text-primary-foreground shadow-glow">
        <Target className="h-5 w-5 mr-2" />
        Iniciar Nova Sessão
      </Button>
    </div>
  );
};

export default History;