import Link from "next/link";
import { getReviews } from "@/lib/reviews";

export default function Home() {
  const reviews = getReviews();

  return (
    <main className="ml-auto mr-auto max-w-4xl px-6 py-12">
      <header className="flex flex-col pb-6 mb-6 border-b">
        <h1 className="text-4xl mx-auto font-bold tracking-tight">
          College Football Reviews
        </h1>

        <p className="mt-3 text-lg mx-auto textalign-center text-gray-600">
          By Mason Holland.
        </p>
        <p className="mt-1 text-lg mx-auto textalign-center text-gray-600">
          No experience, just vibes.
        </p>
      </header>

      <div className="flex flex-col pl-20 max-w-4xl space-y-8">
        {reviews.map((review) => (
          <article key={review.slug}>
            <p className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              <Link
                href={`/review/${review.slug}`}
                className="hover:underline"
              >
                {review.title}
              </Link>
            </h2>
          </article>
        ))}
      </div>
    </main>
  );
}