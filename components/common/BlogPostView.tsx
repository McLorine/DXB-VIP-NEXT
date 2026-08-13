"use client";
import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import type { WPPost } from "@/lib/wordpress/types";

export default function BlogPostView({ post }: { post: WPPost }) {
  return (
    <article>
      {/* ---------------------------------------------------------------- */}
      {/* Hero */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.coverUrl ?? ""}
            alt={post.coverAlt || post.title}
            className="h-full w-full object-cover"
            focalPointY={0.4}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/55 to-charcoal/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 pt-40 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {post.categoryName && (
              <span className="eyebrow">{post.categoryName}</span>
            )}

            <h1 className="mt-6 text-[2.4rem] sm:text-[3.2rem] lg:text-[3.8rem] leading-[1.05] text-white">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/80">
                {post.excerpt}
              </p>
            )}

            <div className="mt-8 flex items-center gap-3 text-sm text-white/60">
              {post.author && <span>{post.author}</span>}
              {post.author && post.publishedOn && (
                <span aria-hidden="true">·</span>
              )}
              {post.publishedOn && (
                <time dateTime={post.publishedOn}>
                  {new Date(post.publishedOn).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Body */}
      {/* ---------------------------------------------------------------- */}
      <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="prose prose-neutral max-w-none prose-headings:text-charcoal prose-a:text-gold-deep prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl sm:prose-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}