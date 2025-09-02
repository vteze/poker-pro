import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePokerSessions } from "@/hooks/usePokerSessions";
import { useToast } from "@/hooks/use-toast";
import { Target } from "lucide-react";

interface NewSessionDialogProps {
  children?: React.ReactNode;
}

const NewSessionDialog = ({ children }: NewSessionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [sessionType, setSessionType] = useState("");
  const [profit, setProfit] = useState("");
  const [duration, setDuration] = useState("");
  const [hands, setHands] = useState("");
  const [vpip, setVpip] = useState("");
  const [pfr, setPfr] = useState("");
  const [aggression, setAggression] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const { addSession } = usePokerSessions();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sessionData = {
        session_type: sessionType,
        profit: Number(profit),
        duration_minutes: Number(duration),
        hands_played: Number(hands),
        vpip: vpip ? Number(vpip) : undefined,
        pfr: pfr ? Number(pfr) : undefined,
        aggression: aggression ? Number(aggression) : undefined,
        notes: notes || undefined,
      };

      const result = await addSession(sessionData);
      
      if (result) {
        toast({
          title: "Sessão registrada!",
          description: "Sua sessão foi registrada com sucesso.",
        });
        
        // Reset form
        setSessionType("");
        setProfit("");
        setDuration("");
        setHands("");
        setVpip("");
        setPfr("");
        setAggression("");
        setNotes("");
        setOpen(false);
      } else {
        throw new Error("Erro ao registrar sessão");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível registrar a sessão. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="gradient-gold text-primary-foreground font-semibold shadow-glow">
            <Target className="h-5 w-5 mr-2" />
            Nova Sessão
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar Nova Sessão</DialogTitle>
          <DialogDescription>
            Registre os detalhes da sua sessão de poker
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sessionType">Tipo de Sessão *</Label>
            <Select value={sessionType} onValueChange={setSessionType} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NL25 Cash">NL25 Cash</SelectItem>
                <SelectItem value="NL50 Cash">NL50 Cash</SelectItem>
                <SelectItem value="NL100 Cash">NL100 Cash</SelectItem>
                <SelectItem value="NL200 Cash">NL200 Cash</SelectItem>
                <SelectItem value="Tournament">Tournament</SelectItem>
                <SelectItem value="MTT">MTT</SelectItem>
                <SelectItem value="Sit & Go">Sit & Go</SelectItem>
                <SelectItem value="Heads Up">Heads Up</SelectItem>
                <SelectItem value="Other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profit">Resultado ($) *</Label>
              <Input
                id="profit"
                type="number"
                step="0.01"
                placeholder="Ex: 125.50"
                value={profit}
                onChange={(e) => setProfit(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duração (min) *</Label>
              <Input
                id="duration"
                type="number"
                placeholder="Ex: 120"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hands">Número de Mãos *</Label>
            <Input
              id="hands"
              type="number"
              placeholder="Ex: 234"
              value={hands}
              onChange={(e) => setHands(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vpip">VPIP (%)</Label>
              <Input
                id="vpip"
                type="number"
                step="0.1"
                min="0"
                max="100"
                placeholder="24.5"
                value={vpip}
                onChange={(e) => setVpip(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pfr">PFR (%)</Label>
              <Input
                id="pfr"
                type="number"
                step="0.1"
                min="0"
                max="100"
                placeholder="18.2"
                value={pfr}
                onChange={(e) => setPfr(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="aggression">Agressão</Label>
              <Input
                id="aggression"
                type="number"
                step="0.1"
                min="0"
                placeholder="2.8"
                value={aggression}
                onChange={(e) => setAggression(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Adicione observações sobre a sessão..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-gold text-primary-foreground font-semibold"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Registrar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewSessionDialog;