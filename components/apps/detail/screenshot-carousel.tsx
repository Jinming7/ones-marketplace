'use client';

import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import type { AppScreenshot } from '@/lib/mock/app-detail-data';

type ScreenshotCarouselProps = {
  screenshots: AppScreenshot[];
};

const DRAG_THRESHOLD = 48;
const AUTO_PLAY_MS = 4200;

export function ScreenshotCarousel({ screenshots }: ScreenshotCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef<number | null>(null);

  const current = useMemo(() => screenshots[index] ?? screenshots[0], [index, screenshots]);

  useEffect(() => {
    if (isPaused || screenshots.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % screenshots.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, screenshots.length]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!containerRef.current) return;

      const active = document.activeElement;
      const inCarousel = active ? containerRef.current.contains(active) : false;
      if (!inCarousel) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setIndex((value) => (value - 1 + screenshots.length) % screenshots.length);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setIndex((value) => (value + 1) % screenshots.length);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [screenshots.length]);

  if (!current) return null;

  function goPrev() {
    setIndex((value) => (value - 1 + screenshots.length) % screenshots.length);
  }

  function goNext() {
    setIndex((value) => (value + 1) % screenshots.length);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    dragStartXRef.current = event.clientX;
    setIsPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragStartXRef.current === null) return;
    setDragOffset(event.clientX - dragStartXRef.current);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (dragStartXRef.current === null) return;

    const delta = event.clientX - dragStartXRef.current;
    dragStartXRef.current = null;
    setDragOffset(0);
    setIsPaused(false);

    if (Math.abs(delta) < DRAG_THRESHOLD) return;
    if (delta > 0) {
      goPrev();
    } else {
      goNext();
    }
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

      <div
        ref={containerRef}
        tabIndex={0}
        className="mt-4 rounded-lg border border-gray-300 bg-gradient-to-br from-white via-gray-100 to-white p-4 outline-none focus-visible:ring-2 focus-visible:ring-brand/30 md:p-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="overflow-hidden rounded-md border border-gray-300 bg-white shadow-soft"
          style={{ transform: `translateX(${dragOffset}px)` }}
        >
          <Image
            src={current.imageUrl}
            alt={current.title}
            width={1440}
            height={900}
            className="h-auto w-full select-none"
            draggable={false}
          />
        </div>

        <div className="mt-4 rounded-md border border-gray-300 bg-white p-4">
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

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-gray-600">Auto-play: {isPaused ? 'Paused' : 'On'} · Drag to switch · Use ← / → keys</p>
        <div className="flex items-center gap-2">
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
      </div>
    </section>
  );
}
