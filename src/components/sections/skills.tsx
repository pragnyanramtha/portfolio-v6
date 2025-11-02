export function Skills({ data }: { data: Record<string, string[]> }) {
  return (
    <div id="skills" className="py-10">
      <h2 className="font-medium text-primary/90 text-base">
        technical skills.
      </h2>

      <ul className="flex flex-col gap-2 mt-4 font-normal text-primary/90 text-base">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className={`${key === "Achievements" ? "items-start" : "items-end"} grid sm:grid-cols-[170px_1fr]`}>
            <p>{key}:</p>
            {key === "Achievements" ? (
              <ul className="flex flex-col gap-1 text-muted-foreground text-sm">
                {value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">{value.join(", ")}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
