import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import NewSessionDialog from "@/components/NewSessionDialog";
import { PokerSession, usePokerSessions } from "@/hooks/usePokerSessions";
import { useToast } from "@/hooks/use-toast";

interface SessionActionsProps {
  session: PokerSession;
}

const SessionActions = ({ session }: SessionActionsProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const { deleteSession } = usePokerSessions();
  const { toast } = useToast();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta sessão?"
    );
    if (!confirmed) return;

    const success = await deleteSession(session.id);
    if (success) {
      toast({ title: "Sessão excluída" });
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível excluir a sessão.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            <Pencil className="h-4 w-4 mr-2" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <NewSessionDialog
        session={session}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
};

export default SessionActions;
