"use client";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Ant" }));

  return (
    <div className="w-96 mx-auto mt-8 flex flex-col gap-4">
      <span className="capitalize text-4xl">{data?.greeting}</span>
    </div>
  );
};
