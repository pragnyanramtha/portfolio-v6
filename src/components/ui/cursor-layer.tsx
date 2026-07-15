"use client";

import dynamic from "next/dynamic";
import useMobileDetection from "@/hooks/use-mobile";

const TargetCursor = dynamic(
  () => import("@/components/ui/target-cursor"),
  { ssr: false }
);

export function CursorLayer() {
  const isMobile = useMobileDetection();

  if (isMobile) return null;

  return <TargetCursor spinDuration={2} hideDefaultCursor />;
}
