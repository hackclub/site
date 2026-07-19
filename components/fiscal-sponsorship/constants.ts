export const FISCAL_COLORS = {
  text: "#17171d",
  background: "#ffffff",
  lightGray: "#f9fafc",
  primary: "#ec3750",
  orange: "#ff8c37",
  white: "#ffffff",
  shadow: "0 2px 16px rgba(0,0,0,0.10)",
  shadowHover: "2px 4px 6px rgba(0,0,0,0.25)",
};

export const FISCAL_TYPOGRAPHY = {
  sectionPaddingV: "clamp(40px, 6vw, 80px)",
  sectionPaddingH: "clamp(16px, 4vw, 64px)",
  /** @deprecated use sectionPaddingV / sectionPaddingH */
  sectionPadding: "clamp(40px, 6vw, 80px)",
  headlineFont: "var(--font-zarathustra)",
  bodyFont: "var(--font-phantom)",
};

/** Feature icons only — name/body come from HcbFeatures translations. */
export const FISCAL_FEATURES = [
  { icon: "bank-account" },
  { icon: "card" },
  { icon: "web" },
  { icon: "payment-transfer" },
  { icon: "explore" },
  { icon: "docs" },
  { icon: "admin" },
  { icon: "support" },
  { icon: "leader" },
] as const;

export const FISCAL_CONTACT = {
  email: "hcb@hackclub.com",
  phone: "+1 (844) 237-2290",
  phoneUri: "+1-844-237-2290",
};
