import { Card, Text } from "theme-ui";
import Link from "next/link";

export default function MailCard(mail) {
    const body = mail.body.length > 250 ? mail.body.substring(0, 100) + "..." : mail.body;
    return (
        <Link href="#" sx={{ cursor: "pointer" }}>
            <Card className="mail-card" sx={{ maxWidth: "1500px" }}>
              <Text as="h1" sx={{ textTransform: "uppercase" }}>{mail.subject || "No Subject"}</Text>
                <Text as="p">
                    {mail.date} — To Orpheus, From Hack Club
                </Text>
              <Text as="h2" sx={{ fontWeight: 'normal' }}>
                  {body || "We're no strangers to love. You know the rules and so do I."}
              </Text>
            </Card>
        </Link>
  );
}
