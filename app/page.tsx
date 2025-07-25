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
        const response = await fetch("api/register-user", {
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

  if (!homeState) {
    return <LoadingIndicator />;
  }

  return <div>Welcome to Discord</div>;
}
