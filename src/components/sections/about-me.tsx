import { renderBoldText } from "@/lib/render-text";

export function AboutMe({ data }: { data: Record<string, string> }) {
  const parts = data.INTRO.split(". ");

  return (
    <div id="aboutme" className="py-10">
      <h2 className="font-medium text-primary/90 text-base">about me.</h2>

      <p className="flex flex-col gap-2 mt-4 font-normal text-muted-foreground text-base text-justify mb-8">
        <span>
          {renderBoldText(parts[0])}
          <span className="inline-block mx-2 text-xl font-bold text-primary/60 leading-none align-middle">·</span>
          {renderBoldText(parts.slice(1).join(". "))}
          <span className="hidden sm:inline">{data.EXPERTISE}</span>
        </span>
      </p>
    </div>
  );
}
