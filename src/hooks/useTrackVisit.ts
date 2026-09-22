import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { destinations } from "@/data/destinations";
import { safeUuid } from "@/lib/utils";

const SESSION_KEY = "visitor_session_id";

const getSessionId = () => {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = safeUuid();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
};

const inferDestinationId = (path: string, search: string): string | null => {
  const detail = path.match(/^\/destination\/([^/]+)/);
  if (detail) return detail[1];
  const params = new URLSearchParams(search);
  const dest = params.get("dest") || params.get("location");
  if (dest && destinations.some((d) => d.id === dest)) return dest;
  return null;
};

export const useTrackVisit = () => {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    const destination_id = inferDestinationId(path, location.search);
    supabase.from("page_views").insert({
      path,
      destination_id,
      session_id: getSessionId(),
      user_agent: navigator.userAgent.slice(0, 255),
    }).then(() => {});
  }, [location.pathname, location.search]);
};
