"use client";

import useMobileDetection from "@/hooks/use-mobile";
import TargetCursor from "@/components/ui/target-cursor";

export function CursorLayer() {
  const isMobile = useMobileDetection();

  if (isMobile) return null;

  return <TargetCursor spinDuration={2} hideDefaultCursor />;
}
