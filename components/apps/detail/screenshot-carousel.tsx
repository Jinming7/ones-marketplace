'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { AppScreenshot } from '@/lib/mock/app-detail-data';

type ScreenshotCarouselProps = {
  screenshots: AppScreenshot[];
};

export function ScreenshotCarousel({ screenshots }: ScreenshotCarouselProps) {
  const [index, setIndex] = useState(0);

  const current = useMemo(() => screenshots[index] ?? screenshots[0], [index, screenshots]);

  if (!current) return null;

  function goPrev() {
    setIndex((value) => (value - 1 + screenshots.length) % screenshots.length);
  }

  function goNext() {
    setIndex((value) => (value + 1) % screenshots.length);
  }

  return (
    <section className="rounded-lg border border-gray-300 bg-white p-5 shadow-soft md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Product Screens</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 transition hover:border-brand hover:text-brand"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 transition hover:border-brand hover:text-brand"
            aria-label="Next screenshot"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-gray-300 bg-gradient-to-br from-white via-gray-100 to-white p-6 md:p-8">
        <div className="rounded-md border border-gray-300 bg-white p-5 shadow-soft">
          <p className="text-xs font-medium uppercase tracking-wide text-brand">{current.title}</p>
          <p className="mt-2 text-base font-semibold text-gray-900">{current.caption}</p>
          <div className="mt-4 grid gap-2 md:grid-cols-3">
            {current.highlights.map((item) => (
              <div key={item} className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-xs text-gray-600">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {screenshots.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(slideIndex)}
            className={`h-2.5 rounded-full transition ${slideIndex === index ? 'w-7 bg-brand' : 'w-2.5 bg-gray-300'}`}
            aria-label={`View ${slide.title}`}
          />
        ))}
      </div>
    </section>
  );
}
