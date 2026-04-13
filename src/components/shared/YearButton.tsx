import React from "react";

interface YearButtonProps {
  year: number | "last";
  currentYear: number | "last" | undefined;
  onClick: () => void;
}

export default function YearButton({ year, currentYear, onClick }: YearButtonProps) {
  const isActive = year === currentYear;
  
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 text-sm rounded-full font-medium transition-all duration-300 border ${
        isActive
          ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm"
          : "bg-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
      }`}
    >
      {year === "last" ? "Last Year" : year}
    </button>
  );
}
