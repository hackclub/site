import Icon from "@hackclub/icons";
import { useRef, useState } from "react";
import { Box, Input, Button, Text, Card, Flex, Grid } from "theme-ui";
import BGImg from "../../background-image";
import FooterImgFile from "../../../public/home/footer.png";
import Link from "next/link";
import MailCard from "../../mail-card";

const Loading = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "2px solid #f3f3f3",
      borderTop: "2px solid #ec3750",
      borderRadius: "50%",
      width: "16px",
      height: "16px",
      animation: "spin 2s linear infinite",
      mr: "5px",
      "@keyframes spin": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    }}
  ></Box>
);

const MailingList = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let res = await fetch("/api/mailing-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
      }),
    });

    formRef.current.reset();

    if (res.ok) {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <Box sx={{ position: "relative", py: 6, background: "darker" }}>
      <Card
        sx={{
          maxWidth: "1050px",
          mx: "auto",
          // mt: [3, 4],
          background: "rgb(255,255,255, 0.45)",
          position: "relative",
          zIndex: 2,
          backdropFilter: "blur(8px)",
        }}
      >
        <Flex sx={{ flexDirection: ["column", "row"], gridGap: [0, 5] }}>
          <Flex
            sx={{
              placeItems: "center",
              justifyContent: "center",
              alignItems: ["left", "left", "center"],
              flexDirection: "column",
              gap: "10px",
              width: ["100%", "75%"],
            }}
          >
            <Box>
              <Text
                variant="title"
                sx={{
                  fontSize: [4, "36px", "42px", 6],
                  zIndex: 2,
                  textAlign: "left",
                }}
              >
                Join the newsletter
              </Text>
              <Text
                sx={{
                  color: "darkless",
                  mt: 2,
                  fontSize: 3,
                  textAlign: "left",
                }}
                as="p"
              >
                We’ll send you an email no more than once a month, when we work
                on something cool for you. Check out{" "}
                <Link href="/newsletter">past issues</Link>.
              </Text>
            </Box>
            <Grid
              as="form"
              ref={formRef}
              onSubmit={handleSubmit}
              gap={[2, 3]}
              sx={{
                textAlign: "center",
                alignItems: "end",
                input: { bg: "sunken" },
                width: "100%",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Input
                  autofillBackgroundColor="highlight"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  required
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: 2,
                  }}
                />
              </Box>
              <div>
                <Input
                  autofillBackgroundColor="highlight"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: 2,
                  }}
                />
              </div>
              <Button type="submit" sx={{ mt: [2, 0], fontSize: 2 }}>
                {submitting ? (
                  <>
                    <Loading /> Subscribe
                  </>
                ) : submitted ? (
                  <>
                    <Icon glyph="send" /> You're on the list!
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </Grid>
          </Flex>
          <Box
            sx={{
              display: "grid",
              gridGap: 4,
              mt: [4, 0],
              width: "100%",
            }}
          >
            <MailCard
              subject="👀 What’s up at Hack Club this time? 👀"
              date="August 2022"
              body="Hey friends! I'm  Ishan, I'm 17, and I'm a Hack Clubber emailing you again! A special thank you to  Belle and  Sam for helping out so much with today's newsletter."
              link="/newsletter/2022-08-august/"
            />
            <MailCard
              subject="Community Newsletter"
              date="September 2022"
              body={`Hey friends! Sam, Hack Clubber from Singapore, here. The last few weeks have been pretty busy at Hack Club, and this is a rundown of what your fellow Hack Clubbers have been up to lately. To start, last week, we shared 🎬 The Assemble Documentary: a film on Assemble to help answer the question "what is a hackathon?". It showcases the magical experience of attending a hackathon, and our hope is that it can help organisers share what’s in store for attendees at their hackathons.`}
              link="/newsletter/2022-09-september/"
            />
          </Box>
        </Flex>
      </Card>
      {/*<Box
            sx={{
                position: "absolute",
                display: "block",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
                background: "linear-gradient(-180deg, #f1c40f 14%, #ff8c37 82%)",
            }}
        />*/}
      <BGImg
        src={FooterImgFile}
        alt="Hack Clubbers gather in the great outdoors of Cabot, VT, for an experience unlike any other: Outernet. 📸 Photo by Matt Gleich, Hack Clubber in NH!"
        priority
        gradient="linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.45))"
      />
    </Box>
  );
};

export default MailingList;
