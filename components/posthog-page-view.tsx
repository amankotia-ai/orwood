"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

export function PostHogPageView({
  event,
  properties,
}: {
  event: string;
  properties?: Record<string, unknown>;
}) {
  useEffect(() => {
    posthog.capture(event, properties);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
