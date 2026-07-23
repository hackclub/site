"use client";

import { useMemo, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-css";
import { useTranslations } from "next-intl";

interface WebfontCssBoxProps {
  code: string;
}

export function WebfontCssBox({ code }: WebfontCssBoxProps) {
  const t = useTranslations("Brand");
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
          <span>{t("webfontTitle")}</span>
          <span className="brand-details__hint brand-details__hint--closed">
            {t("webfontExpand")}
          </span>
          <span className="brand-details__hint brand-details__hint--open">
            {t("webfontCollapse")}
          </span>
        </span>
        <button
          type="button"
          className="brand-details__copy"
          onClick={handleCopy}
          aria-label={t("webfontCopyAria")}
        >
          {copied ? t("copied") : t("copy")}
        </button>
      </summary>
      <pre className="language-css">
        <code className="language-css" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </details>
  );
}
