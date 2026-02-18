"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { CustomSelect } from "@/components/CustomSelect";

interface InstallModalProps {
  isOpen: boolean;
  appName: string;
  onClose: () => void;
  onSuccess: (team: string) => void;
}

export function InstallModal({ isOpen, appName, onClose, onSuccess }: InstallModalProps) {
  const [team, setTeam] = useState("Engineering A");
  const [readIssues, setReadIssues] = useState(true);
  const [writeComments, setWriteComments] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] bg-black/50" onClick={onClose}>
      <div
        className="mx-auto mt-24 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-slate-900">Install {appName}</h3>

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700">Select Team</label>
            <CustomSelect
              value={team}
              onChange={setTeam}
              options={[
                { value: "Engineering A", label: "Engineering A" },
                { value: "Design B", label: "Design B" },
                { value: "Sandbox", label: "Sandbox" }
              ]}
              className="mt-2"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">Grant Permissions</p>
            <label className="mt-2 flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={readIssues} onChange={(e) => setReadIssues(e.target.checked)} />
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Read Issues
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={writeComments}
                onChange={(e) => setWriteComments(e.target.checked)}
              />
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Write Comments
            </label>
          </div>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSuccess(team)}
            className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Confirm Installation
          </button>
        </div>
      </div>
    </div>
  );
}
