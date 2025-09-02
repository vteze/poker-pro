import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import HandGuide from "@/components/HandGuide";
import Calculator from "@/components/Calculator";
import History from "@/components/History";
import Coach from "@/components/Coach";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");

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
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentTab()}
      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

export default Index;
