import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <BlurFade>
          <span
            className={cn(
              "eyebrow",
              align === "center" && "justify-center",
              light && "text-accent"
            )}
          >
            <span className="h-px w-6 bg-accent" />
            {eyebrow}
          </span>
        </BlurFade>
      )}
      <BlurFade delay={0.08}>
        <h2
          className={cn(
            "mt-4 text-balance",
            light ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h2>
      </BlurFade>
      {description && (
        <BlurFade delay={0.16}>
          <p
            className={cn(
              "mt-4 text-[17px] leading-relaxed",
              light ? "text-white/70" : "text-muted"
            )}
          >
            {description}
          </p>
        </BlurFade>
      )}
    </div>
  );
}
