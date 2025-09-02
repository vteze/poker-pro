import { TrendingUp, TrendingDown, Clock, Target, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    {
      title: "Lucro Total",
      value: "+$2,450",
      change: "+12.5%",
      icon: DollarSign,
      positive: true
    },
    {
      title: "ROI",
      value: "15.8%",
      change: "+2.1%",
      icon: TrendingUp,
      positive: true
    },
    {
      title: "Tempo Jogado",
      value: "47h 32m",
      change: "Esta semana",
      icon: Clock,
      positive: null
    },
    {
      title: "Sessões",
      value: "23",
      change: "-3 vs semana anterior",
      icon: Users,
      positive: false
    }
  ];

  const recentSessions = [
    { id: 1, type: "NL50 Cash", profit: 125, duration: "2h 15m", hands: 234 },
    { id: 2, type: "NL25 Cash", profit: -45, duration: "1h 30m", hands: 187 },
    { id: 3, type: "Tournament", profit: 280, duration: "3h 45m", hands: 156 },
    { id: 4, type: "NL100 Cash", profit: 95, duration: "1h 50m", hands: 203 }
  ];

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-gold bg-clip-text text-transparent">
          PokerPro Coach
        </h1>
        <p className="text-muted-foreground">
          Transformando você em um jogador profissional
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`text-xs flex items-center gap-1 ${
                stat.positive === true ? 'text-profit' : 
                stat.positive === false ? 'text-loss' : 'text-muted-foreground'
              }`}>
                {stat.positive === true && <TrendingUp className="h-3 w-3" />}
                {stat.positive === false && <TrendingDown className="h-3 w-3" />}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Acesso Rápido</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-12 gradient-gold text-primary-foreground font-semibold shadow-glow">
            <Target className="h-5 w-5 mr-2" />
            Nova Sessão
          </Button>
          <Button variant="secondary" className="h-12">
            <TrendingUp className="h-5 w-5 mr-2" />
            Calculadora
          </Button>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Sessões Recentes</h2>
        <div className="space-y-2">
          {recentSessions.map((session) => (
            <Card key={session.id} className="hand-card">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{session.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.duration} • {session.hands} mãos
                    </p>
                  </div>
                  <div className={`text-right ${
                    session.profit > 0 ? 'text-profit' : 'text-loss'
                  }`}>
                    <p className="font-semibold">
                      {session.profit > 0 ? '+' : ''}${session.profit}
                    </p>
                    <div className="flex items-center gap-1">
                      {session.profit > 0 ? 
                        <TrendingUp className="h-3 w-3" /> : 
                        <TrendingDown className="h-3 w-3" />
                      }
                      <span className="text-xs">
                        {session.profit > 0 ? 'Lucro' : 'Perda'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;