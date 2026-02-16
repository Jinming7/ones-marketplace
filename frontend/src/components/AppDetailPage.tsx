"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { BadgeCheck, Database, Lock, Shield, Star } from "lucide-react";
import { AppDetailModel } from "@/lib/types";
import { useAppSelector } from "@/store/hooks";
import { RequestAppModal } from "./RequestAppModal";

const tabs = ["概述", "定价", "评价", "安全与隐私"] as const;

type TabName = (typeof tabs)[number];

interface AppDetailPageProps {
  app: AppDetailModel;
}

function SecurityPrivacyTab({ app }: { app: AppDetailModel }) {
  const securityInfo = app.securityInfo;

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
          <Database className="h-5 w-5 text-brand-600" />
          数据管理
        </h3>
        <ul className="space-y-1 text-sm text-slate-700">
          <li>数据存储位置：{securityInfo?.dataManagement?.storageLocation ?? "未披露"}</li>
          <li>数据驻留：{securityInfo?.dataManagement?.dataResidency ?? "未披露"}</li>
          <li>备份策略：{securityInfo?.dataManagement?.backupPolicy ?? "未披露"}</li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
          <Shield className="h-5 w-5 text-brand-600" />
          合规与认证
        </h3>
        <div className="flex flex-wrap gap-2">
          {(securityInfo?.compliance ?? []).map((item) => (
            <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700">
              {item}
            </span>
          ))}
          {app.programs.map((program) => (
            <span key={program.code} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              {program.label}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
          <Lock className="h-5 w-5 text-brand-600" />
          安全与隐私
        </h3>
        <ul className="space-y-1 text-sm text-slate-700">
          <li>静态加密：{securityInfo?.security?.encryptionAtRest ? "是" : "否 / 未披露"}</li>
          <li>传输加密：{securityInfo?.security?.encryptionInTransit ? "是" : "否 / 未披露"}</li>
          <li>漏洞赏金：{securityInfo?.security?.bugBounty ? "是" : "否 / 未披露"}</li>
          <li>审计日志：{securityInfo?.security?.auditLog ? "支持" : "不支持 / 未披露"}</li>
          <li>DPA：{securityInfo?.privacy?.dpAgreement ? "支持" : "不支持 / 未披露"}</li>
          <li>PII 处理：{securityInfo?.privacy?.piiProcessing ?? "未披露"}</li>
          <li>数据保留策略：{securityInfo?.privacy?.retentionPolicy ?? "未披露"}</li>
        </ul>
      </section>
    </div>
  );
}

export function AppDetailPage({ app }: AppDetailPageProps) {
  const [activeTab, setActiveTab] = useState<TabName>("概述");
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const role = useAppSelector((state) => state.user.role);

  const cta = useMemo(() => {
    if (role === "ORG_ADMIN") {
      return { label: "免费试用", action: () => undefined };
    }

    return {
      label: "请求试用",
      action: () => setIsRequestOpen(true)
    };
  }, [role]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Image
              src={app.logoUrl}
              alt={`${app.name} logo`}
              width={80}
              height={80}
              className="h-20 w-20 rounded-2xl border border-slate-200"
            />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{app.name}</h1>
              <p className="mt-1 text-sm text-slate-600">{app.partnerName}</p>
              <p className="mt-2 inline-flex items-center gap-1 text-sm text-slate-700">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {app.rating.toFixed(1)} · {app.installs.toLocaleString()} installs
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {app.programs.map((program) => (
                  <span key={program.code} className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {program.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={cta.action}
            className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {cta.label}
          </button>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "概述" ? <p className="leading-7 text-slate-700">{app.description ?? app.summary}</p> : null}

        {activeTab === "定价" ? (
          <div className="text-slate-700">
            <h3 className="text-lg font-semibold text-slate-900">定价模型</h3>
            <p className="mt-2">{app.pricingModel ?? "免费试用（默认）"}</p>
          </div>
        ) : null}

        {activeTab === "评价" ? (
          <div className="space-y-4">
            {(app.reviews ?? []).length === 0 ? (
              <p className="text-slate-600">暂无评价</p>
            ) : (
              app.reviews?.map((review) => (
                <article key={review.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="text-sm font-semibold text-slate-900">{review.title ?? "匿名评价"}</div>
                  <p className="mt-1 text-sm text-slate-700">{review.content ?? ""}</p>
                </article>
              ))
            )}
          </div>
        ) : null}

        {activeTab === "安全与隐私" ? <SecurityPrivacyTab app={app} /> : null}
      </section>

      <RequestAppModal
        appId={app.id}
        appName={app.name}
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
      />
    </main>
  );
}
