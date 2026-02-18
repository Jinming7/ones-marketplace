"use client";

import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface FilterPillProps {
  label: string;
  options: Option[];
  selectedValues: string[];
  onApply: (values: string[]) => void;
}

function FilterPill({ label, options, selectedValues, onApply }: FilterPillProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [draft, setDraft] = useState<string[]>(selectedValues);

  useEffect(() => {
    setDraft(selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const filteredOptions = useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(keyword.toLowerCase())),
    [options, keyword]
  );

  const isActive = selectedValues.length > 0;

  const toggleOption = (value: string) => {
    setDraft((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition ${
          isActive
            ? "border-blue-200 bg-blue-100 text-blue-700"
            : "border-gray-100 bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {label}
        {selectedValues.length ? ` (${selectedValues.length})` : ""}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {open ? (
        <div className="absolute right-0 z-[100] mt-2 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-2xl animate-in fade-in zoom-in-95 transition-all">
          <div className="sticky top-0 border-b border-gray-100 bg-white p-2">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder={`Search ${label.toLowerCase()}...`}
              className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-blue-400"
            />
          </div>

          <div className="max-h-56 overflow-auto py-1">
            {filteredOptions.map((option) => {
              const checked = draft.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center rounded-lg px-3 py-2 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleOption(option.value)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              );
            })}
          </div>

          <div className="mt-1 flex items-center justify-between border-t border-gray-100 px-2 pt-2">
            <button
              type="button"
              onClick={() => setDraft([])}
              className="text-xs text-gray-500 transition hover:text-red-500"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(draft);
                setOpen(false);
              }}
              className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  hostingOptions: Option[];
  categoryOptions: Option[];
  selectedHostings: string[];
  onHostingsApply: (values: string[]) => void;
  selectedCategories: string[];
  onCategoriesApply: (values: string[]) => void;
}

export function FilterBar({
  search,
  onSearchChange,
  hostingOptions,
  categoryOptions,
  selectedHostings,
  onHostingsApply,
  selectedCategories,
  onCategoriesApply
}: FilterBarProps) {
  return (
    <div className="relative z-20 mt-8 flex flex-wrap items-center gap-3">
      <div className="flex min-w-[320px] flex-1 items-center rounded-full border border-gray-200 bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <Search className="ml-3 h-5 w-5 text-gray-400" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search apps, categories..."
          className="w-full bg-transparent px-3 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>

      <FilterPill
        label="Hosting"
        options={hostingOptions}
        selectedValues={selectedHostings}
        onApply={onHostingsApply}
      />

      <FilterPill
        label="Categories"
        options={categoryOptions}
        selectedValues={selectedCategories}
        onApply={onCategoriesApply}
      />
    </div>
  );
}
