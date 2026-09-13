import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const reviewsDirectory = path.join(process.cwd(), "content", "reviews");

export type Review = {
  slug: string;
  title: string;
  date: Date;
  content: string;
};

export function getReviews(): Review[] {
  const files = fs.readdirSync(reviewsDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(reviewsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        slug,
        title: String(data.title),
        date: new Date(data.date),
        content,
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getReview(slug: string): Review | null {
  const fullPath = path.join(reviewsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: String(data.title),
    date: new Date(data.date),
    content,
  };
}