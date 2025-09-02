import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface PokerSession {
  id: string;
  session_type: string;
  profit: number;
  duration_minutes: number;
  hands_played: number;
  vpip?: number;
  pfr?: number;
  aggression?: number;
  notes?: string;
  created_at: string;
}

interface PokerSessionsContextValue {
  sessions: PokerSession[];
  loading: boolean;
  addSession: (
    sessionData: Omit<PokerSession, "id" | "created_at">
  ) => Promise<PokerSession | null>;
  refetch: () => Promise<void>;
  stats: {
    totalProfit: number;
    totalHands: number;
    totalTime: number;
    sessionCount: number;
    avgVpip: number;
    avgPfr: number;
    avgAggression: number;
  };
}

const PokerSessionsContext = createContext<PokerSessionsContextValue | undefined>(
  undefined
);

export const PokerSessionsProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<PokerSession[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSessions = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("poker_sessions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching sessions:", error);
        return;
      }

      setSessions(data || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addSession = async (
    sessionData: Omit<PokerSession, "id" | "created_at">
  ) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("poker_sessions")
        .insert({
          user_id: user.id,
          ...sessionData,
        })
        .select()
        .single();

      if (error) {
        console.error("Error adding session:", error);
        return null;
      }

      setSessions((prev) => [data, ...prev]);
      return data;
    } catch (error) {
      console.error("Error adding session:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const stats = useMemo(() => ({
    totalProfit: sessions.reduce(
      (sum, session) => sum + Number(session.profit),
      0
    ),
    totalHands: sessions.reduce((sum, session) => sum + session.hands_played, 0),
    totalTime: sessions.reduce(
      (sum, session) => sum + session.duration_minutes,
      0
    ),
    sessionCount: sessions.length,
    avgVpip:
      sessions.length > 0
        ? sessions.reduce((sum, session) => sum + (session.vpip || 0), 0) /
          sessions.length
        : 0,
    avgPfr:
      sessions.length > 0
        ? sessions.reduce((sum, session) => sum + (session.pfr || 0), 0) /
          sessions.length
        : 0,
    avgAggression:
      sessions.length > 0
        ? sessions.reduce((sum, session) => sum + (session.aggression || 0), 0) /
          sessions.length
        : 0,
  }), [sessions]);

  return (
    <PokerSessionsContext.Provider
      value={{ sessions, loading, addSession, refetch: fetchSessions, stats }}
    >
      {children}
    </PokerSessionsContext.Provider>
  );
};

export const usePokerSessions = () => {
  const context = useContext(PokerSessionsContext);
  if (!context) {
    throw new Error(
      "usePokerSessions must be used within a PokerSessionsProvider"
    );
  }
  return context;
};
