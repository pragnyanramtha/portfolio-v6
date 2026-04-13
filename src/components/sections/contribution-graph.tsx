"use client";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import { github } from "@/app/data/contribution-graph-theme";
import { useState, useEffect } from "react";
import YearButton from "../shared/YearButton";
import { getGitHubYears } from "@/app/utils/calculate-years";
import EmptyState from "../shared/EmptyState";
import { IoIosAnalytics } from "react-icons/io";

export default function ContributionGraph() {
  const [calendarYear, setCalendarYear] = useState<number | "last">("last");
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const [serverTheme, setServerTheme] = useState<"light" | "dark" | undefined>(
    undefined
  );
  const scheme =
    theme === "light" ? "light" : theme === "dark" ? "dark" : systemTheme;

  // Set theme only after rendering to avoid mismatch between client and server
  useEffect(() => {
    setMounted(true);
    setServerTheme(scheme as "light" | "dark" | undefined);
  }, [scheme]);

  const today = new Date().getFullYear();
  const envUser = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const username = envUser && envUser.trim() !== "" && envUser !== "undefined"
    ? envUser
    : "pragnyanramtha";

  const envYear = process.env.NEXT_PUBLIC_GITHUB_JOIN_YEAR;
  let joinYear = 2024; // User requested to remove 2023
  if (envYear && envYear.trim() !== "" && envYear !== "undefined") {
    const parsed = Number(envYear);
    if (!isNaN(parsed) && parsed > 2000) {
      joinYear = parsed > 2024 ? parsed : 2024;
    }
  }

  const years = getGitHubYears(joinYear);

  if (!mounted) {
    return null; // Prevents hydration mismatch before client takes over
  }

  if (!username || !joinYear)
    return (
      <EmptyState
        icon={<IoIosAnalytics />}
        title="Unable to load Contribution Graph"
        message="We could not find any GitHub credentials added to the .env file. To display the graph, provide your username and the year you joined GitHub"
      />
    );

  return (
    <div className="flex flex-col mt-12 w-full max-w-full items-start overflow-hidden">

      {/* Title */}
      <div className="w-full mb-4 px-1">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Contribution Timeline
        </h2>
      </div>

      {/* Calendar Card */}
      <div className="relative w-full mx-auto max-w-[100%]">
        <div className="w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="min-w-max pr-4">
            <GitHubCalendar
              username={username}
              theme={github}
              colorScheme={serverTheme}
              blockSize={12.7}
              blockMargin={4}
              fontSize={14}
              year={calendarYear === "last" ? undefined : calendarYear}
              transformData={(data) => {
                // Prevent crash if GitHub returns an empty array for a specific year
                if (!data || data.length === 0) {
                  return [{ date: `${calendarYear === "last" ? today : calendarYear}-01-01`, count: 0, level: 0 }];
                }
                return data;
              }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-row flex-wrap gap-2 justify-start w-full mt-4 pt-5 border-t border-zinc-200 dark:border-zinc-800/60 px-1">
        {years.slice(0, 5).map((year) => (
          <YearButton
            key={year}
            year={year}
            currentYear={calendarYear}
            onClick={() => setCalendarYear(calendarYear === year ? "last" : year)}
          />
        ))}
      </div>

    </div>
  );
}
