import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, LogOut, Users, TrendingUp, Activity, ShieldAlert } from "lucide-react";
import { destinations } from "@/data/destinations";

type Signup = { id: string; name: string; phone: string; location: string; created_at: string };
type PageView = { id: string; path: string; destination_id: string | null; session_id: string | null; created_at: string };

export default function Admin() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const admin = !!roles?.some((r) => r.role === "admin");
      if (!mounted) return;
      setIsAdmin(admin);
      setChecking(false);
      if (admin) await loadData();
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth", { replace: true });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    const [s, p] = await Promise.all([
      supabase.from("visitor_signups").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("page_views").select("*").order("created_at", { ascending: false }).limit(1000),
    ]);
    if (s.data) setSignups(s.data as Signup[]);
    if (p.data) setPageViews(p.data as PageView[]);
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center space-y-4">
          <ShieldAlert className="h-12 w-12 text-destructive mx-auto" />
          <h1 className="text-xl font-semibold">Admin access required</h1>
          <p className="text-sm text-muted-foreground">
            Your account does not have admin privileges. Sign in with the admin email to access this dashboard.
          </p>
          <Button onClick={signOut} variant="outline" className="w-full">
            Sign out
          </Button>
        </Card>
      </div>
    );
  }

  // Compute trending destinations from last 7 days of page views
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentViews = pageViews.filter((v) => new Date(v.created_at).getTime() > sevenDaysAgo);
  const destCounts = new Map<string, number>();
  recentViews.forEach((v) => {
    if (v.destination_id) destCounts.set(v.destination_id, (destCounts.get(v.destination_id) ?? 0) + 1);
  });
  const trending = Array.from(destCounts.entries())
    .map(([id, count]) => {
      const d = destinations.find((x) => x.id === id);
      return { id, name: d?.name ?? id, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const uniqueSessions = new Set(pageViews.map((v) => v.session_id).filter(Boolean)).size;
  const recent24h = pageViews.filter((v) => Date.now() - new Date(v.created_at).getTime() < 24 * 60 * 60 * 1000).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Before You Go — live analytics</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadData} variant="outline" size="sm" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
            </Button>
            <Button onClick={signOut} variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={<Users className="h-5 w-5" />} label="Total signups" value={signups.length} />
          <StatCard icon={<Activity className="h-5 w-5" />} label="Page views (last 24h)" value={recent24h} />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Unique sessions" value={uniqueSessions} />
        </div>

        <Tabs defaultValue="signups" className="w-full">
          <TabsList>
            <TabsTrigger value="signups">Visitor signups ({signups.length})</TabsTrigger>
            <TabsTrigger value="trending">Trending destinations</TabsTrigger>
            <TabsTrigger value="activity">Live activity</TabsTrigger>
          </TabsList>

          <TabsContent value="signups">
            <Card className="p-0 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead className="text-right">Signed up</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {signups.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No signups yet.
                      </TableCell>
                    </TableRow>
                  )}
                  {signups.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.phone}</TableCell>
                      <TableCell>{s.location}</TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">
                        {new Date(s.created_at).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="trending">
            <Card className="p-6 space-y-3">
              <p className="text-sm text-muted-foreground">Most viewed destinations (last 7 days)</p>
              {trending.length === 0 && <p className="text-muted-foreground">No destination views yet.</p>}
              {trending.map((t, i) => (
                <div key={t.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">#{i + 1}</Badge>
                    <span className="font-medium">{t.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{t.count} views</span>
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="p-0 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Path</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Session</TableHead>
                    <TableHead className="text-right">When</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageViews.slice(0, 100).map((v) => (
                    <TableRow key={v.id}>
                      <TableCell className="font-mono text-xs">{v.path}</TableCell>
                      <TableCell>{v.destination_id ?? "—"}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {v.session_id?.slice(0, 8) ?? "—"}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">
                        {new Date(v.created_at).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 text-muted-foreground text-sm">
        {icon}
        {label}
      </div>
      <div className="text-3xl font-bold mt-2">{value.toLocaleString()}</div>
    </Card>
  );
}