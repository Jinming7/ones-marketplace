import { AppCard } from "@/components/AppCard";

const mockApps = [
  {
    key: "jira-sync",
    logoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&q=80",
    name: "Jira Sync Pro",
    partnerName: "ONES Partner Lab",
    rating: 4.8,
    installs: 12043,
    summary: "双向同步 ONES 与 Jira 任务，减少跨系统协作损耗。",
    programs: [{ code: "ONES_CERTIFIED", label: "ONES 认证" }]
  },
  {
    key: "security-hub",
    logoUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=120&q=80",
    name: "Security Hub",
    partnerName: "SecureWorks",
    rating: 4.7,
    installs: 5344,
    summary: "集成漏洞扫描、告警看板和审计追踪，满足企业合规审查。",
    programs: [
      { code: "BUG_BOUNTY", label: "漏洞赏金" },
      { code: "ONES_CERTIFIED", label: "ONES 认证" }
    ]
  }
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">ONES Marketplace</h1>
        <p className="mt-2 text-slate-600">发现、评估并安装适合你团队的 ONES 扩展应用</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockApps.map((app) => (
          <AppCard key={app.key} app={app} />
        ))}
      </section>
    </main>
  );
}
