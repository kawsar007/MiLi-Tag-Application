interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const bodyTone = tone === "dark" ? "text-cloud" : "text-ink";
  const descTone = tone === "dark" ? "text-steel-soft" : "text-steel";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignClass}`}>
      {eyebrow ? (
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`font-display text-3xl font-medium leading-tight sm:text-4xl ${bodyTone}`}>
        {title}
      </h2>
      {description ? (
        <p className={`text-base leading-relaxed ${descTone}`}>{description}</p>
      ) : null}
    </div>
  );
}
