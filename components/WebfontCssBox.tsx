"use client";

import { useMemo, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-css";

interface WebfontCssBoxProps {
  code: string;
}

export function WebfontCssBox({ code }: WebfontCssBoxProps) {
  const [copied, setCopied] = useState(false);

  const highlightedCode = useMemo(() => Prism.highlight(code, Prism.languages.css, "css"), [code]);

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <details className="brand-details">
      <summary>
        <span className="brand-details__title-wrap">
          <span>Webfont CSS</span>
          <span className="brand-details__hint brand-details__hint--closed">(click to expand)</span>
          <span className="brand-details__hint brand-details__hint--open">(click to collapse)</span>
        </span>
        <button
          type="button"
          className="brand-details__copy"
          onClick={handleCopy}
          aria-label="Copy webfont CSS"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </summary>
      <pre className="language-css">
        <code className="language-css" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </details>
  );
}
