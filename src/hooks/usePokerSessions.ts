import { useState, useEffect } from "react";
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

export const usePokerSessions = () => {
  const [sessions, setSessions] = useState<PokerSession[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSessions = async () => {
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
  };

  const addSession = async (sessionData: Omit<PokerSession, "id" | "created_at">) => {
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

      setSessions(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error("Error adding session:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  // Calculate stats from sessions
  const stats = {
    totalProfit: sessions.reduce((sum, session) => sum + Number(session.profit), 0),
    totalHands: sessions.reduce((sum, session) => sum + session.hands_played, 0),
    totalTime: sessions.reduce((sum, session) => sum + session.duration_minutes, 0),
    sessionCount: sessions.length,
    avgVpip: sessions.length > 0 
      ? sessions.reduce((sum, session) => sum + (session.vpip || 0), 0) / sessions.length 
      : 0,
    avgPfr: sessions.length > 0 
      ? sessions.reduce((sum, session) => sum + (session.pfr || 0), 0) / sessions.length 
      : 0,
    avgAggression: sessions.length > 0 
      ? sessions.reduce((sum, session) => sum + (session.aggression || 0), 0) / sessions.length 
      : 0,
  };

  return {
    sessions,
    loading,
    addSession,
    refetch: fetchSessions,
    stats,
  };
};