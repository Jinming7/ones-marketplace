import Link from "next/link";
import { notFound } from "next/navigation";

import { getAppsByCategoryId, getCategoryBySlug } from "@/lib/mock/repository";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const apps = getAppsByCategoryId(category.id);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">{category.name}</h1>
        <p className="mt-2 text-slate-600">{category.description}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {apps.map((app) => (
          <Link key={app.id} href={`/apps/${app.slug}`} className="rounded-lg border bg-white p-5 hover:bg-slate-50">
            <h2 className="font-semibold text-slate-900">{app.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{app.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
