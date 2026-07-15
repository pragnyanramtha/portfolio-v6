import { renderBoldText } from "@/lib/render-text";

export function AboutMe({
  data,
}: {
  data: Record<string, string | { name: string; url: string; highlight?: boolean }[]>;
}) {
  const intro = data.INTRO as string;
  const openSource = (data.OPEN_SOURCE ?? []) as { name: string; url: string; highlight?: boolean }[];
  const points = intro.split(". ");

  return (
    <div id="aboutme" className="py-10">
      <h2 className="font-medium text-primary/90 text-base">about me.</h2>

      <ul className="mt-4 space-y-2 text-muted-foreground text-base">
        {points.map((point, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-primary/40 mt-0.5 select-none shrink-0">•</span>
            <span>
              {renderBoldText(point)}
              {i === points.length - 1 && openSource.length > 0 && (
                <>
                  {", "}
                  {openSource.map((repo, j) => (
                    <span key={repo.name} className="inline">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={repo.highlight
                          ? "font-bold text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                          : "underline underline-offset-2 decoration-muted-foreground/30 hover:text-primary hover:decoration-primary/50 transition-colors"
                        }
                      >
                        {repo.name}
                      </a>
                      {j < openSource.length - 1 && ", "}
                    </span>
                  ))}
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
