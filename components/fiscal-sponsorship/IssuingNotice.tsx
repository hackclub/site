import { FISCAL_TYPOGRAPHY } from "@/components/fiscal-sponsorship/constants";

export function IssuingNotice({ dark = false }: { dark?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        padding: "20px 24px",
        textAlign: "center",
        backgroundColor: dark ? "#12131a" : "#f9fafc",
        borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e8eaed",
      }}
    >
      {/* Stripe requires this to be present on every page that mentions our card program */}
      <p
        style={{
          margin: 0,
          fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
          fontSize: 13,
          lineHeight: 1.5,
          color: dark ? "rgba(255,255,255,0.45)" : "#687578",
        }}
      >
        HCB Visa® Commercial cards are powered by Stripe and issued by Celtic Bank.
      </p>
    </div>
  );
}
