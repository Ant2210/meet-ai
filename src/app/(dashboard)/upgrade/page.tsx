import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { redirectIfNotAuthenticated } from "@/lib/auth-utils";
import {
  UpgradeView,
  UpgradeViewError,
  UpgradeViewLoading,
} from "@/modules/premium/ui/views/upgrade-view";
import { getQueryClient, trpc } from "@/trpc/server";

const UpgradePage = async () => {
  await redirectIfNotAuthenticated();

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.premium.getCurrentSubscription.queryOptions(),
  );
  void queryClient.prefetchQuery(trpc.premium.getProducts.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<UpgradeViewLoading />}>
        <ErrorBoundary fallback={<UpgradeViewError />}>
          <UpgradeView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default UpgradePage;
