import { Home, BookOpen, Calculator, TrendingUp, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ currentTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "dashboard", label: "Início", icon: Home },
    { id: "guide", label: "Mãos", icon: BookOpen },
    { id: "calculator", label: "Calc", icon: Calculator },
    { id: "history", label: "Histórico", icon: TrendingUp },
    { id: "coach", label: "Coach", icon: Brain }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border p-2">
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={currentTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange(tab.id)}
            className={`flex-col h-12 p-1 text-xs ${
              currentTab === tab.id 
                ? "gradient-gold text-primary-foreground shadow-glow" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4 mb-1" />
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;