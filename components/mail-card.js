import { Box, Card, Text } from "theme-ui";
import Link from "next/link";

export default function MailCard(mail) {
  const body =
    mail.body.length > 80 ? mail.body.substring(0, 80) + "..." : mail.body;
  return (
    <Link href={mail.link || "/newsletter"}>
      <Card
        as="span"
        sx={{
          maxWidth: "1500px",
          cursor: "pointer",
          transform: ["scale(0.75)", "none"],
          transformOrigin: "bottom left",
          flex: 1,
        }}
      >
        <Box>
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
            {mail.subject || "No Subject"}
          </Text>
          <Text as="p">{mail.date} — To Orpheus, From Hack Club</Text>
          <Text as="h2" sx={{ fontWeight: "normal" }}>
            {body}
          </Text>
        </Box>
      </Card>
    </Link>
  );
}
