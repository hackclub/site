"use client";

import Markdown, { Components } from "react-markdown";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function Heading({ level, children }: { level: number; children: React.ReactNode }) {
  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.map((c) => (typeof c === "string" ? c : "")).join("")
        : "";
  const id = slugify(text);
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  return (
    <Tag id={id} className="md-heading">
      <a href={`#${id}`} className="md-heading__anchor" aria-hidden="true" tabIndex={-1}>
        #
      </a>
      {children}
    </Tag>
  );
}

const components: Components = {
  h1: ({ children }) => <Heading level={1}>{children}</Heading>,
  h2: ({ children }) => <Heading level={2}>{children}</Heading>,
  h3: ({ children }) => <Heading level={3}>{children}</Heading>,
  h4: ({ children }) => <Heading level={4}>{children}</Heading>,
};

export function MarkdownPage({ content }: { content: string }) {
  return (
    <main id="main" tabIndex={-1} className="markdown-page">
      <Navbar />
      <article className="markdown-page__content">
        <Markdown components={components}>{content}</Markdown>
      </article>
      <Footer />

      <style>{`
        .markdown-page {
          background: var(--background);
          color: var(--foreground);
        }

        .markdown-page__content {
          width: min(800px, calc(100vw - 48px));
          margin: 48px auto;
          padding: 48px 0 80px;
          font-family: var(--font-phantom);
          font-size: 1.125rem;
          line-height: 1.7;
        }

        .markdown-page__content h1 {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.15;
          margin: 0 0 24px;
          color: var(--foreground);
          text-align: center;
        }

        .markdown-page__content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.25;
          margin: 48px 0 16px;
          color: var(--foreground);
        }

        .markdown-page__content h3 {
          font-size: 1.375rem;
          font-weight: 700;
          line-height: 1.3;
          margin: 36px 0 12px;
          color: var(--foreground);
        }

        .markdown-page__content h4 {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.3;
          margin: 36px 0 12px;
          color: var(--foreground);
        }

        .md-heading {
          position: relative;
        }

        .md-heading__anchor {
          position: absolute;
          left: -1.2em;
          color: var(--muted);
          text-decoration: none;
          font-weight: 400;
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        .md-heading:hover .md-heading__anchor {
          opacity: 1;
        }

        .md-heading__anchor:hover {
          color: var(--red);
        }

        .markdown-page__content h1 .md-heading__anchor {
          position: static;
          display: none;
        }

        .markdown-page__content p {
          margin: 0 0 16px;
        }

        .markdown-page__content a {
          color: var(--red);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .markdown-page__content ul {
          margin: 0 0 16px;
          padding-left: 24px;
          list-style-type: disc;
        }

        .markdown-page__content ol {
          margin: 0 0 16px;
          padding-left: 24px;
          list-style-type: decimal;
        }

        .markdown-page__content li {
          margin-bottom: 6px;
        }

        .markdown-page__content li > ul {
          margin-top: 6px;
          margin-bottom: 0;
          list-style-type: circle;
        }

        .markdown-page__content li > ul li {
          color: var(--muted);
        }

        .markdown-page__content li > ol {
          margin-top: 6px;
          margin-bottom: 0;
        }

        .markdown-page__content hr {
          border: none;
          border-top: 2px solid var(--border);
          margin: 48px 0;
        }

        .markdown-page__content strong {
          font-weight: 700;
        }

        .markdown-page__content em {
          font-style: italic;
        }

        @media (max-width: 640px) {
          .markdown-page__content {
            width: calc(100vw - 32px);
            padding: 32px 0 60px;
            font-size: 1rem;
          }

          .markdown-page__content h1 {
            font-size: 1.875rem;
          }

          .markdown-page__content h2 {
            font-size: 1.5rem;
            margin-top: 36px;
          }

          .markdown-page__content h3 {
            font-size: 1.25rem;
          }

          .markdown-page__content h4 {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </main>
  );
}
