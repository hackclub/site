import { Card, Text } from "theme-ui";

export default function MailCard({ mail }) {
  return (
    <Card className="mail-card" sx={{ maxWidth: "1500px" }}>
      <Text as="h1" sx={{ textTransform: "uppercase" }}>{/*{mail.subject || "No Subject"}*/} No Subject</Text>
        <Text as="p">
            26/04/2021 — To Orpheus, From Hack Club
        </Text>
      <Text as="h2" sx={{ fontWeight: 'normal' }}>
          Incididunt ipsum mollit occaecat et est magna pariatur elit nulla. Commodo aliqua aliquip exercitation minim veniam aliqua aliqua qui eiusmod do.
      </Text>
    </Card>
  );
}
