"use client";

import { useClerk } from "@clerk/nextjs";
import { useCallback, useState } from "react";
import { User } from "stream-chat";
import { LoadingIndicator } from "stream-chat-react";

type HomeState = {
  apiKey: string;
  user: User;
  token: string;
};

export default function Home() {
  const [homeState, setHomeState] = useState<HomeState | undefined>();
  const { user: clerkUser } = useClerk();

  const registerUser = useCallback(
    async function registerUser() {
      const userId = clerkUser?.id;
      const mail = clerkUser?.primaryEmailAddress?.emailAddress;
      if (userId && mail) {
        const response = await fetch("/api/register-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId, email: mail }),
        });
        const responseBody = response.json();
        return responseBody;
      }
    },
    [clerkUser]
  );

  async function getUserToken(userId: string, userName: string) {
    const response = await fetch("/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId }),
    });

    const responseBody = await response.json();
    const token = responseBody.token;

    if (!token) {
      console.error("No token found");
    }

    const user: User = {
      id: userId,
      name: userName,
      image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
    };

    const apiKey = process.env.STREAM_API_KEY;
    if (apiKey) {
      setHomeState({ apiKey: apiKey, user: user, token: token });
    }
  }

  if (!homeState) {
    return <LoadingIndicator />;
  }

  return <div color="white">Welcome to Discord</div>;
}
