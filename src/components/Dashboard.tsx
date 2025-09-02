import { TrendingUp, TrendingDown, Clock, Target, DollarSign, Users, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { usePokerSessions } from "@/hooks/usePokerSessions";
import NewSessionDialog from "@/components/NewSessionDialog";
import SessionActions from "@/components/SessionActions";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { sessions, stats, loading } = usePokerSessions();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchDisplayName = async () => {
      if (!user) return;

      // Prefer the value stored on the auth user's metadata
      if (user.user_metadata?.display_name) {
        setDisplayName(user.user_metadata.display_name);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", user.id)
        .single();
      if (data?.display_name) {
        setDisplayName(data.display_name);
      }
    };
    fetchDisplayName();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer logout. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Format time in hours and minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Calculate ROI
  const calculateROI = () => {
    if (stats.sessionCount === 0) return "0.0%";
    // Assuming average buy-in of $100 for ROI calculation
    const avgBuyIn = 100;
    const totalInvested = stats.sessionCount * avgBuyIn;
    const roi = (stats.totalProfit / totalInvested) * 100;
    return `${roi.toFixed(1)}%`;
  };

  const dashboardStats = [
    {
      title: "Lucro Total",
      value: `${stats.totalProfit >= 0 ? '+' : ''}$${stats.totalProfit.toFixed(2)}`,
      change: `${stats.sessionCount} sessões`,
      icon: DollarSign,
      positive: stats.totalProfit >= 0
    },
    {
      title: "ROI",
      value: calculateROI(),
      change: "Baseado nas sessões",
      icon: TrendingUp,
      positive: stats.totalProfit >= 0
    },
    {
      title: "Tempo Jogado",
      value: formatTime(stats.totalTime),
      change: "Total acumulado",
      icon: Clock,
      positive: null
    },
    {
      title: "Mãos Jogadas",
      value: stats.totalHands.toString(),
      change: `${Math.round(stats.totalHands / (stats.sessionCount || 1))} por sessão`,
      icon: Users,
      positive: null
    }
  ];

  const recentSessions = sessions.slice(0, 4);

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-center flex-1 space-y-2">
          <h1 className="text-3xl font-bold gradient-gold bg-clip-text text-transparent">
            PokerPro Coach
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo, {displayName || user?.email?.split('@')[0]}!
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleSignOut}
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {loading ? (
          Array(4).fill(0).map((_, index) => (
            <Card key={index} className="stat-card animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-4 w-4 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-24 mb-2"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          dashboardStats.map((stat, index) => (
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
        )))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Acesso Rápido</h2>
        <div className="grid grid-cols-2 gap-3">
          <NewSessionDialog>
            <Button className="h-12 w-full gradient-gold text-primary-foreground font-semibold shadow-glow">
              <Target className="h-5 w-5 mr-2" />
              Nova Sessão
            </Button>
          </NewSessionDialog>
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
          {loading ? (
            Array(4).fill(0).map((_, index) => (
              <Card key={index} className="hand-card animate-pulse">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-24"></div>
                      <div className="h-3 bg-muted rounded w-32"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-16 ml-auto"></div>
                      <div className="h-3 bg-muted rounded w-12 ml-auto"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : recentSessions.length === 0 ? (
            <Card className="hand-card">
              <CardContent className="p-6 text-center">
                <div className="space-y-2">
                  <Target className="h-8 w-8 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Nenhuma sessão registrada ainda</p>
                  <NewSessionDialog>
                    <Button variant="outline" size="sm">
                      Registrar primeira sessão
                    </Button>
                  </NewSessionDialog>
                </div>
              </CardContent>
            </Card>
          ) : (
            recentSessions.map((session) => (
              <Card key={session.id} className="hand-card">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{session.session_type}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatTime(session.duration_minutes)} • {session.hands_played} mãos
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`text-right ${
                          Number(session.profit) > 0 ? 'text-profit' : 'text-loss'
                        }`}
                      >
                        <p className="font-semibold">
                          {Number(session.profit) > 0 ? '+' : ''}${Number(session.profit)}
                        </p>
                        <div className="flex items-center gap-1">
                          {Number(session.profit) > 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span className="text-xs">
                            {Number(session.profit) > 0 ? 'Lucro' : 'Perda'}
                          </span>
                        </div>
                      </div>
                      <SessionActions session={session} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;