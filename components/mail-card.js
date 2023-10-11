import { Box, Card, Text } from "theme-ui";
import Link from "next/link";

export default function MailCard({ body, issue, date, link }) {
  body = body.length > 80 ? body.substring(0, 80) + "..." : body;
  return (
    <Card
      variant="interactive"
      sx={{
        borderRadius: 18,
        display: "inline-block",
        overflow: "hidden",
        bg: "white",
        maxWidth: "1500px",
        cursor: "pointer",
        padding: "0 !important",
      }}
    >
      <Link href={link || "/newsletter"}>
        <div>
          <Box
            sx={{
              width: "100%",
              height: "12px",
              backgroundImage: "url('/letter-pattern.svg')",
              backgroundRepeat: "repeat-x",
              backgroundSize: "100%",
            }}
          />
          <Box sx={{ p: [3, 4] }}>
            <Text as="h1" sx={{ textTransform: "uppercase" }}>
              {date}
            </Text>
            <Text as="p">Newsletter #{issue} — From Hack Club, To You</Text>
            <Text as="h2" sx={{ fontWeight: "normal" }}>
              {body}
            </Text>
          </Box>
        </div>
      </Link>
    </Card>
  );
}
