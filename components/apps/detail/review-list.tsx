import { Star } from 'lucide-react';

import type { AppReview } from '@/lib/mock/app-detail-data';

type ReviewListProps = {
  reviews: AppReview[];
};

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <section className="rounded-lg border border-gray-300 bg-white p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
      <div className="mt-4 space-y-4">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-md border border-gray-300 bg-gray-100 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-gray-900">{review.author}</p>
                <p className="text-xs text-gray-600">{review.role}</p>
              </div>
              <div className="text-right">
                <p className="inline-flex items-center gap-1 text-sm font-medium text-gray-900">
                  <Star className="h-4 w-4 fill-brand text-brand" />
                  {review.rating.toFixed(1)}
                </p>
                <p className="text-xs text-gray-600">{review.dateLabel}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-700">{review.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
