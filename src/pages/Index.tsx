import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Dashboard from "@/components/Dashboard";
import HandGuide from "@/components/HandGuide";
import Calculator from "@/components/Calculator";
import History from "@/components/History";
import Coach from "@/components/Coach";
import Profile from "@/components/Profile";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const { user, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const renderCurrentTab = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard />;
      case "guide":
        return <HandGuide />;
      case "calculator":
        return <Calculator />;
      case "history":
        return <History />;
      case "coach":
        return <Coach />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {renderCurrentTab()}
      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

export default Index;
