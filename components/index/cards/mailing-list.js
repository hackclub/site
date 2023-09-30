import Icon from "@hackclub/icons";
import { useRef, useState } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  Alert,
  Card,
  Flex,
  Grid,
} from "theme-ui";
import BGImg from "../../background-image";
import FooterImgFile from "../../../public/outernet/hack.jpg";
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
          display: "flex",
            gridGap: 5,
        }}
      >
        <Flex
          sx={{
            justifyContent: "space-between",
            alignItems: ["left", "left", "center"],
            flexDirection: ["column", "column", "column"],
            gap: "10px",
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
              We’ll send you an email no more than once a month, when we work on
              something cool for you. Check out{" "}
              <Link href="#">past issues</Link>.
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
                  outline: "none",
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
                  outline: "none",
                }}
              />
            </div>
            <Button type="submit" sx={{ mt: [2, 0], fontSize: 2 }}>
              {submitting ? (
                <>
                  <Loading />
                  &nbsp; Subscribe
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </Grid>
            {submitted && (
                <Alert variant="primary" sx={{ bg: "green", mt: [2, 3] }}>
                    <Icon glyph="send" />
                    <Text sx={{ ml: 2 }}>You're on the list!</Text>
                </Alert>
            )}
        </Flex>
        <Box sx={{
            display: "grid",
            gridGap: 4
        }}>
            <MailCard subject="Hello, world!" date="26/11/23" body="Reprehenderit quis et culpa anim mollit proident cillum laborum veniam eiusmod. Mollit laborum do magna elit labore et do exercitation duis laboris qui et non enim. Commodo deserunt tempor esse aute aliquip. Cupidatat proident officia consequat et id do dolore labore ad eiusmod labore. Cupidatat nisi tempor duis magna irure duis aliqua nisi occaecat est esse. Ea laboris quis dolore officia voluptate aliqua id aliquip eiusmod irure aliquip ex nisi dolor. Eu tempor pariatur non ipsum culpa ex. Consequat aute aute do laborum Lorem minim adipisicing sint mollit ea."/>
            <MailCard subject="Hello, again!" date="26/11/23" body="AHHHHH!!"/>
        </Box>
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
