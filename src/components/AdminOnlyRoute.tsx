import { type ReactNode } from "react";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import ComingSoon from "@/pages/ComingSoon";

const AdminOnlyRoute = ({ feature, children }: { feature: string; children: ReactNode }) => {
  const { isAdmin, loading } = useIsAdmin();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }
  if (!isAdmin) return <ComingSoon feature={feature} />;
  return <>{children}</>;
};

export default AdminOnlyRoute;