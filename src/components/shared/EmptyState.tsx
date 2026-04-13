import React, { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  message: string;
}

export default function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg text-center gap-4 dark:bg-primary-bg bg-secondary-bg">
      <div className="text-4xl text-zinc-400 dark:text-zinc-500">
        {icon}
      </div>
      <div className="max-w-md">
        <h3 className="font-semibold text-lg text-primary/90">{title}</h3>
        <p className="text-muted-foreground text-sm mt-2">
          {message}
        </p>
      </div>
    </div>
  );
}
