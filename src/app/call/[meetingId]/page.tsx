import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { redirectIfNotAuthenticated } from "@/lib/auth-utils";
import { CallView } from "@/modules/calls/ui/views/call-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface CallPageProps {
  params: Promise<{
    meetingId: string;
  }>;
}

const CallPage = async ({ params }: CallPageProps) => {
  await redirectIfNotAuthenticated();

  const { meetingId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>There was an error</p>}>
          <CallView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default CallPage;
