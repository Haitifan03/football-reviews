import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getReview, getReviews } from "@/lib/reviews";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const reviews = getReviews();

  return reviews.map((review) => ({
    slug: review.slug,
  }));
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = getReview(slug);

  if (!review) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-gray-900"
      >
        ← Back to reviews
      </Link>

      <header className="mx-auto max-w-3xl mt-8 border-b pb-8">
        <p className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString()}
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          {review.title}
        </h1>
      </header>
      <div className="p-5 space-y-5">
        <ReactMarkdown>{review.content}</ReactMarkdown>
      </div>
    </main>
  );
}