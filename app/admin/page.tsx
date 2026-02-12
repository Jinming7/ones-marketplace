import { appList, categoryList, vendorList } from "@/lib/mock/repository";

export default function AdminPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-lg border bg-white p-5">
          <p className="text-sm text-slate-500">Apps</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{appList.length}</p>
        </article>
        <article className="rounded-lg border bg-white p-5">
          <p className="text-sm text-slate-500">Vendors</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{vendorList.length}</p>
        </article>
        <article className="rounded-lg border bg-white p-5">
          <p className="text-sm text-slate-500">Categories</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{categoryList.length}</p>
        </article>
      </div>
    </section>
  );
}
