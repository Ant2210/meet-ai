"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState(false);

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          window.alert(`Success! Welcome ${name} 🎉`);
        },
        onError: () => {
          setIsLoading(false);
          window.alert("Something went wrong!! 😱");
        },
      },
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          window.alert(`Success! Welcome back 🎉`);
        },
        onError: () => {
          setIsLoading(false);
          window.alert("Something went wrong!! 😱");
        },
      },
    );
  };

  if (session) {
    return (
      <div className="w-96 mx-auto mt-8 flex flex-col gap-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="w-96 mx-auto mt-8 flex flex-col gap-4">
      <Button
        variant="link"
        className="hover:cursor-pointer"
        onClick={() => setLogin(!login)}
      >
        {login ? "Sign up" : "Login"}
      </Button>
      {!login && (
        <Input
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <Input
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className="hover:cursor-pointer"
        disabled={isLoading}
        onClick={login ? onLogin : onSubmit}
      >
        {login ? "Login" : "Create user"}
      </Button>
    </div>
  );
}
