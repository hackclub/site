import { Box, Card, Text } from "theme-ui";
import Link from "next/link";

export default function MailCard({ body, date, subject, link }) {
  body = body.length > 80 ? body.substring(0, 80) + "..." : body;
  return (
    <Card
      variant="interactive"
      sx={{
        maxWidth: "1500px",
        cursor: "pointer",
      }}
    >
      <Link href={link || "/newsletter"}>
        <div>
          <Box
            sx={{
              width: "100%",
              height: "20px",
              backgroundImage:
                "url('https://cloud-jopr4l3j5-hack-club-bot.vercel.app/0letter-pattern.svg')",
              backgroundRepeat: "repeat-x",
            }}
          />
          <Text as="h1" sx={{ textTransform: "uppercase" }}>
            {subject}
          </Text>
          <Text as="p">{date} — To You, From Hack Club</Text>
          <Text as="h2" sx={{ fontWeight: "normal" }}>
            {body}
          </Text>
        </div>
      </Link>
    </Card>
  );
}
