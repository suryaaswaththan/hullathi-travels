import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
}

export function PageHero({ eyebrow, title, subtitle, image }: Props) {
  return (
    <section className="relative flex min-h-[58vh] items-end overflow-hidden md:min-h-[64vh]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/55 to-primary-dark/35" />
      <div className="container-wide relative z-10 pb-14 pt-28 md:pb-20">
        {eyebrow && (
          <BlurFade>
            <span className="eyebrow text-accent">
              <span className="h-px w-6 bg-accent" />
              {eyebrow}
            </span>
          </BlurFade>
        )}
        <BlurFade delay={0.08}>
          <h1 className="mt-4 max-w-3xl text-balance text-white">{title}</h1>
        </BlurFade>
        {subtitle && (
          <BlurFade delay={0.16}>
            <p className="mt-4 max-w-prose text-lg text-white/75">{subtitle}</p>
          </BlurFade>
        )}
      </div>
    </section>
  );
}
