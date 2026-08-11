"use client";
import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import BlogPreview from "./BlogPreview";

type Article = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  read_minutes: number;
  cover_url: string;
  published_on: string;
  body: string;
  id: number;
};

export default function BlogPreviewClient() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    base44.entities.Article.list("-published_on", 3 as any).then((res: Article[]) => setArticles(res));
  }, []);

  return <BlogPreview articles={articles} />;
}