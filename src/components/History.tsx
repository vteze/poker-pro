import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Target, Clock, Users, DollarSign, BarChart3 } from "lucide-react";
import { usePokerSessions } from "@/hooks/usePokerSessions";
import NewSessionDialog from "@/components/NewSessionDialog";
import SessionActions from "@/components/SessionActions";

const History = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const { sessions, loading, stats } = usePokerSessions();

  const periods = [
    { id: "week", label: "Semana" },
    { id: "month", label: "Mês" },
    { id: "all", label: "Todas" }
  ];

  // Filter sessions based on selected period
  const filterSessionsByPeriod = (sessions: any[], period: string) => {
    if (period === "all") return sessions;
    
    const now = new Date();
    const periodStart = new Date();
    
    if (period === "week") {
      periodStart.setDate(now.getDate() - 7);
    } else if (period === "month") {
      periodStart.setMonth(now.getMonth() - 1);
    }
    
    return sessions.filter(session => new Date(session.created_at) >= periodStart);
  };

  const filteredSessions = filterSessionsByPeriod(sessions, selectedPeriod);

  // Calculate stats for filtered sessions
  const filteredStats = {
    totalProfit: filteredSessions.reduce((sum, session) => sum + Number(session.profit), 0),
    totalHands: filteredSessions.reduce((sum, session) => sum + session.hands_played, 0),
    totalTime: filteredSessions.reduce((sum, session) => sum + session.duration_minutes, 0),
    avgVpip: filteredSessions.length > 0 
      ? filteredSessions.reduce((sum, session) => sum + (session.vpip || 0), 0) / filteredSessions.length 
      : 0,
    avgPfr: filteredSessions.length > 0 
      ? filteredSessions.reduce((sum, session) => sum + (session.pfr || 0), 0) / filteredSessions.length 
      : 0,
    avgAggression: filteredSessions.length > 0 
      ? filteredSessions.reduce((sum, session) => sum + (session.aggression || 0), 0) / filteredSessions.length 
      : 0,
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatSessionTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const summaryStats = [
    {
      title: "Lucro Total",
      value: `${filteredStats.totalProfit >= 0 ? '+' : ''}$${filteredStats.totalProfit.toFixed(2)}`,
      icon: DollarSign,
      positive: filteredStats.totalProfit >= 0
    },
    {
      title: "Mãos",
      value: filteredStats.totalHands.toString(),
      icon: Users,
      positive: null
    },
    {
      title: "Tempo",
      value: formatTime(filteredStats.totalTime),
      icon: Clock,
      positive: null
    },
    {
      title: "VPIP Médio",
      value: `${filteredStats.avgVpip.toFixed(1)}%`,
      icon: BarChart3,
      positive: null
    },
    {
      title: "PFR Médio",
      value: `${filteredStats.avgPfr.toFixed(1)}%`,
      icon: TrendingUp,
      positive: null
    },
    {
      title: "Agressão Média",
      value: filteredStats.avgAggression.toFixed(1),
      icon: Target,
      positive: null
    }
  ];

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

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 gap-4">
        {loading ? (
          Array(6).fill(0).map((_, index) => (
            <Card key={index} className="stat-card animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-4 w-4 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-6 bg-muted rounded w-16"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          summaryStats.map((stat, index) => (
            <Card key={index} className="stat-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className={`text-lg font-bold ${
                  stat.positive === true ? 'text-profit' : 
                  stat.positive === false ? 'text-loss' : ''
                }`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Sessions List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Histórico de Sessões</h2>
          <NewSessionDialog>
            <Button className="gradient-gold text-primary-foreground font-semibold shadow-glow">
              <Target className="h-4 w-4 mr-2" />
              Nova Sessão
            </Button>
          </NewSessionDialog>
        </div>
        
        <div className="space-y-2">
          {loading ? (
            Array(5).fill(0).map((_, index) => (
              <Card key={index} className="hand-card animate-pulse">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-muted rounded w-24"></div>
                      <div className="h-4 bg-muted rounded w-16"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-3 bg-muted rounded w-32"></div>
                      <div className="h-3 bg-muted rounded w-20"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-3 bg-muted rounded w-16"></div>
                      <div className="h-3 bg-muted rounded w-16"></div>
                      <div className="h-3 bg-muted rounded w-16"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredSessions.length === 0 ? (
            <Card className="hand-card">
              <CardContent className="p-6 text-center">
                <div className="space-y-2">
                  <Target className="h-8 w-8 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">
                    {selectedPeriod === "all" 
                      ? "Nenhuma sessão registrada ainda"
                      : `Nenhuma sessão encontrada no período selecionado`
                    }
                  </p>
                  <NewSessionDialog>
                    <Button variant="outline" size="sm">
                      Registrar nova sessão
                    </Button>
                  </NewSessionDialog>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredSessions.map((session) => (
              <Card key={session.id} className="hand-card">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{session.session_type}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`font-semibold ${
                            Number(session.profit) >= 0 ? 'text-profit' : 'text-loss'
                          }`}
                        >
                          {Number(session.profit) >= 0 ? '+' : ''}${Number(session.profit).toFixed(2)}
                        </div>
                        <SessionActions session={session} />
                      </div>
                    </div>

                    {/* Session Details */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>{formatDate(session.created_at)}</span>
                        <span>{formatSessionTime(session.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Number(session.profit) >= 0 ? 
                          <TrendingUp className="h-3 w-3" /> : 
                          <TrendingDown className="h-3 w-3" />
                        }
                        <span>
                          {formatTime(session.duration_minutes)} • {session.hands_played} mãos
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div className="text-center">
                        <div className="text-muted-foreground">VPIP</div>
                        <div className="font-medium">{session.vpip ? session.vpip.toFixed(1) : '-'}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-muted-foreground">PFR</div>
                        <div className="font-medium">{session.pfr ? session.pfr.toFixed(1) : '-'}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-muted-foreground">Agressão</div>
                        <div className="font-medium">{session.aggression ? session.aggression.toFixed(1) : '-'}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;