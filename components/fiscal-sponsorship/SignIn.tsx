"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface HCBUser {
  name: string;
  avatar: string;
}

export function SignIn() {
  const [user, setUser] = useState<HCBUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch("https://hcb.hackclub.com/api/current_user", {
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch HCB user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const hasUser = !isLoading && Boolean(user);
  const label = hasUser ? "Continue to HCB" : "Sign in";

  return (
    <>
      <a
        href="https://hcb.hackclub.com"
        className={`fiscal-signin${hasUser ? " fiscal-signin--has-user" : ""}`}
      >
        {hasUser && user ? (
          <>
            <span className="fiscal-signin__avatar-ring">
              <Image
                src={user.avatar}
                alt={`${user.name}'s HCB avatar`}
                width={28}
                height={28}
                className="fiscal-signin__avatar"
              />
            </span>
            <span className="fiscal-signin__label">{label}</span>
          </>
        ) : (
          <span className="fiscal-signin__label">{label}</span>
        )}
      </a>
      <style jsx global>{`
        .fiscal-signin {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-sizing: border-box;
          width: fit-content;
          max-width: 100%;
          min-width: 160px;
          height: 52px;
          padding: 0 22px;
          border-radius: 9999px;
          border: 3px solid transparent;
          background: transparent;
          color: #ffffff;
          font-size: 16px;
          font-family: var(--font-phantom);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.02em;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease,
            box-shadow 0.2s ease;
          white-space: nowrap;
        }

        .fiscal-signin--has-user {
          justify-content: flex-start;
          width: fit-content;
          min-width: 0;
          padding: 0 22px 0 18px;
          box-shadow: 0 8px 18px rgba(255, 255, 255, 0.08);
          border: 1.5px solid rgba(255, 255, 255);
          background: rgba(255, 255, 255, 0.05);
        }

        .fiscal-signin:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          box-shadow: 0 10px 22px rgba(255, 255, 255, 0.12);
        }

        .fiscal-signin:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.9);
          outline-offset: 3px;
        }

        .fiscal-signin__avatar-ring {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.16);
        }

        .fiscal-signin__avatar {
          flex: none;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .fiscal-signin__label {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          line-height: 1;
        }
      `}</style>
    </>
  );
}
