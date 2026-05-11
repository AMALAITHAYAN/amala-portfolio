"use client";

import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Code2,
  Download,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import {
  achievements,
  education,
  experience,
  profile,
  projects,
  services,
  skillGroups,
  stats,
  technologies,
} from "@/data/portfolio";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

const iconMap = [Code2, ShieldCheck, Layers3, Rocket];

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <motion.div
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-8 max-w-3xl"
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-cyan-200/70">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {copy ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/58 sm:text-lg">
          {copy}
        </p>
      ) : null}
    </motion.div>
  );
}

function GlowOrb({ className }: { className: string }) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{
        x: [0, 18, -10, 0],
        y: [0, -14, 18, 0],
        scale: [1, 1.08, 0.96, 1],
      }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    />
  );
}

function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4.2, delay, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`
    );

    event.currentTarget.style.setProperty(
      "--mouse-y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={
          {
            background:
              "radial-gradient(650px circle at var(--mouse-x) var(--mouse-y), rgba(103,232,249,0.15), transparent 40%)",
          } as CSSProperties
        }
      />

      <div className="relative">{children}</div>
    </div>
  );
}

function GradientButton({
  href,
  children,
  target,
  rel,
}: {
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
}) {
  return (
    <motion.a
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      href={href}
      target={target}
      rel={rel}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-6 py-3.5 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20"
    >
      <span className="absolute inset-0 -translate-x-[130%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.75),transparent)] transition duration-700 group-hover:translate-x-[130%]" />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

function OutlineButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <motion.a
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-6 py-3.5 font-medium text-white backdrop-blur transition hover:border-white/25 hover:bg-white/[0.08]"
    >
      {children}
    </motion.a>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/35 lg:flex"
    >
      <span>Scroll</span>

      <div className="relative h-10 w-6 rounded-full border border-white/15">
        <motion.span
          animate={{
            y: [4, 18, 4],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-200"
        />
      </div>
    </motion.div>
  );
}

function SignatureStrip() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease }}
      className="pb-16"
    >
      <SpotlightCard className="p-4">
        <div className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/[0.025] p-4 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="flex flex-col justify-center p-2 sm:p-4">
            <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/[0.08] px-3 py-1.5 text-xs uppercase tracking-[0.28em] text-cyan-100/75">
              <Sparkles className="h-3.5 w-3.5" />
              Signature
            </div>

            <h3 className="text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl">
              Built with intent.
            </h3>
          </div>

          <div className="relative overflow-hidden rounded-[1.4rem] border border-[#21180f]/10 bg-[#f6f0e6] p-5 text-slate-950 shadow-2xl shadow-black/20 sm:p-6">
            <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:100%_30px]" />

            <div className="relative h-[145px]">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 2, ease }}
                className="absolute left-0 top-3 whitespace-nowrap text-[2rem] leading-none tracking-[-0.04em] text-slate-950 sm:text-[2.8rem]"
                style={{
                  fontFamily:
                    "'Snell Roundhand', 'Apple Chancery', 'Brush Script MT', cursive",
                }}
              >
                Amala Ithayan
              </motion.div>

              <svg
                viewBox="0 0 560 120"
                fill="none"
                className="absolute bottom-0 left-0 h-24 w-full"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M12 82C72 65 122 88 184 74C234 63 268 70 323 79C379 89 438 66 547 84"
                  stroke="#0F172A"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55, duration: 1.9, ease }}
                />
              </svg>

              <motion.div
                initial={{ x: 0, opacity: 0 }}
                whileInView={{
                  x: [0, 90, 205, 350, 515],
                  opacity: [0, 1, 1, 1, 0],
                }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 2, ease }}
                className="absolute left-0 top-[88px] h-2.5 w-2.5 rounded-full bg-slate-950 shadow-[0_0_18px_rgba(15,23,42,0.45)]"
              />
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.section>
  );
}

function ProjectVisual({ title }: { title: string }) {
  if (title === "Smart Attendance Platform") {
    return (
      <div className="grid h-48 grid-cols-[0.32fr_0.68fr] gap-3 rounded-3xl border border-white/10 bg-[#07131f] p-4">
        <div className="rounded-2xl bg-white/[0.06] p-3">
          <div className="mb-3 h-3 w-16 rounded-full bg-cyan-200/70" />
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-white/15" />
            <div className="h-2 rounded-full bg-white/10" />
            <div className="h-2 rounded-full bg-white/10" />
            <div className="h-2 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-white/[0.06] p-3" />
            <div className="rounded-2xl bg-white/[0.06] p-3" />
            <div className="rounded-2xl bg-white/[0.06] p-3" />
          </div>

          <div className="rounded-2xl bg-white/[0.06] p-4">
            <div className="flex h-full items-end gap-2">
              <div className="h-10 w-full rounded-t-lg bg-cyan-300/80" />
              <div className="h-16 w-full rounded-t-lg bg-cyan-300/60" />
              <div className="h-8 w-full rounded-t-lg bg-cyan-300/75" />
              <div className="h-20 w-full rounded-t-lg bg-cyan-300/90" />
              <div className="h-12 w-full rounded-t-lg bg-cyan-300/65" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (title === "Farm Management Platform") {
    return (
      <div className="grid h-48 grid-cols-[0.62fr_0.38fr] gap-3 rounded-3xl border border-white/10 bg-[#07160f] p-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/15" />
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10" />
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10" />
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/20" />
        </div>

        <div className="grid gap-2">
          <div className="rounded-2xl bg-white/[0.06] p-3">
            <div className="h-3 w-12 rounded-full bg-emerald-200/70" />
            <div className="mt-4 h-10 rounded-2xl bg-white/[0.06]" />
          </div>
          <div className="rounded-2xl bg-white/[0.06] p-3" />
        </div>
      </div>
    );
  }

  if (title === "Women Safety SOS App") {
    return (
      <div className="flex h-48 items-center justify-center gap-4 rounded-3xl border border-white/10 bg-[#16070d] p-4">
        <div className="grid h-full w-28 rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-3">
          <div className="mx-auto mt-4 grid h-20 w-20 place-items-center rounded-full border-4 border-rose-300/70 text-xl font-semibold text-rose-100">
            SOS
          </div>
          <div className="mt-auto space-y-2">
            <div className="h-2 rounded-full bg-white/15" />
            <div className="h-2 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="grid h-full flex-1 gap-3">
          <div className="rounded-2xl bg-white/[0.06]" />
          <div className="rounded-2xl bg-white/[0.06]" />
        </div>
      </div>
    );
  }

  if (title === "Online Voting System") {
    return (
      <div className="grid h-48 gap-3 rounded-3xl border border-white/10 bg-[#0d0820] p-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-white/[0.06]" />
          <div className="rounded-2xl bg-white/[0.06]" />
          <div className="rounded-2xl bg-white/[0.06]" />
        </div>

        <div className="rounded-2xl bg-white/[0.06] p-4">
          <div className="space-y-3">
            <div className="h-3 w-[78%] rounded-full bg-violet-300/80" />
            <div className="h-3 w-[60%] rounded-full bg-violet-300/60" />
            <div className="h-3 w-[42%] rounded-full bg-violet-300/45" />
            <div className="h-3 w-[28%] rounded-full bg-violet-300/35" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-48 grid-cols-[0.42fr_0.58fr] gap-3 rounded-3xl border border-white/10 bg-[#07111c] p-4">
      <div className="grid place-items-center rounded-2xl bg-white/[0.06]">
        <div className="relative h-24 w-24">
          <div className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full bg-cyan-300/80" />
          <div className="absolute bottom-0 left-0 h-8 w-8 rounded-full bg-emerald-300/70" />
          <div className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-rose-300/70" />
          <div className="absolute left-1/2 top-8 h-10 w-px -translate-x-1/2 bg-white/20" />
          <div className="absolute bottom-7 left-5 h-px w-14 bg-white/20" />
        </div>
      </div>

      <div className="grid gap-2">
        <div className="rounded-2xl bg-white/[0.06]" />
        <div className="rounded-2xl bg-white/[0.06]" />
        <div className="rounded-2xl bg-white/[0.06]" />
      </div>
    </div>
  );
}

function serviceGridClass(index: number) {
  if (index === 0) return "md:col-span-2";
  return "";
}

function projectGridClass(index: number) {
  if (index === 0) return "lg:col-span-2";
  return "";
}

export default function PortfolioSite() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 110]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#05070b] text-white selection:bg-cyan-200 selection:text-slate-950">
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <GlowOrb className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
        <GlowOrb className="absolute right-[-12rem] top-[18rem] h-[32rem] w-[32rem] rounded-full bg-violet-500/14 blur-3xl" />
        <GlowOrb className="absolute bottom-[-10rem] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <header className="sticky top-0 z-40 pt-5">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.055] px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-5"
          >
            <a href="#home" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-white to-cyan-100 text-sm font-semibold text-slate-950">
                AI
              </span>

              <span className="hidden text-sm font-medium tracking-[0.25em] text-white/75 sm:inline">
                AMALA ITHAYAN
              </span>
            </a>

            <nav className="hidden items-center gap-7 text-sm text-white/60 md:flex">
              <a href="#about" className="transition hover:text-white">
                About
              </a>
              <a href="#services" className="transition hover:text-white">
                Build
              </a>
              <a href="#projects" className="transition hover:text-white">
                Work
              </a>
              <a href="#experience" className="transition hover:text-white">
                Experience
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </nav>

            <motion.a
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20"
            >
              <span className="absolute inset-0 -translate-x-[130%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.8),transparent)] transition duration-700 group-hover:translate-x-[130%]" />
              <Download className="relative h-4 w-4" />
              <span className="relative">Resume</span>
            </motion.a>
          </motion.div>
        </header>

        <section
          id="home"
          className="relative grid min-h-screen items-center gap-14 pb-12 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:pt-4"
        >
          <motion.div style={{ y: heroY }} className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/[0.08] px-4 py-2 text-sm text-cyan-50/85 backdrop-blur"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>
              Open to opportunities
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.12 }}
            >
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7, ease }}
                className="mb-5 text-sm uppercase tracking-[0.35em] text-white/40"
              >
                Java · Spring Boot · React
              </motion.p>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.8, ease }}
                className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl"
              >
                Building secure
                <span className="block bg-gradient-to-r from-white via-cyan-100 to-violet-300 bg-clip-text text-transparent">
                  full-stack systems.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.8, ease }}
                className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg"
              >
                Backend-first developer creating reliable products people can
                actually use.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.8, ease }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <GradientButton href="#projects">
                  View work
                  <ArrowUpRight className="h-4 w-4" />
                </GradientButton>

                <OutlineButton href="#contact">Contact me</OutlineButton>
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.8, ease }}
                className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55"
              >
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </span>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <FaGithub className="h-4 w-4" />
                  GitHub
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                  LinkedIn
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="relative mx-auto w-full max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease }}
              className="relative rounded-[2rem] border border-white/10 bg-white/[0.065] p-4 shadow-2xl shadow-cyan-950/25 backdrop-blur-xl"
            >
              <div className="rounded-[1.45rem] border border-white/10 bg-black/30 p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-300/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">
                    profile.ts
                  </span>
                </div>

                <SpotlightCard className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-200 to-sky-400 font-semibold text-slate-950">
                      AI
                    </div>

                    <div>
                      <p className="font-medium text-white">{profile.name}</p>
                      <p className="text-sm text-white/50">{profile.role}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Backend", "Spring Boot"],
                      ["Frontend", "React"],
                      ["Cloud", "AWS"],
                      ["Database", "MySQL"],
                    ].map(([label, value], index) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.45 + index * 0.1,
                          duration: 0.55,
                          ease,
                        }}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                          {label}
                        </p>

                        <p className="mt-2 text-sm font-medium text-white/90">
                          {value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </SpotlightCard>

                <div className="mt-4 rounded-3xl border border-white/10 bg-[#07121b] p-5 font-mono text-sm text-white/75">
                  <div className="mb-3 flex items-center gap-2 text-cyan-200/80">
                    <TerminalSquare className="h-4 w-4" />
                    <span>build.ts</span>
                  </div>

                  <div className="space-y-2">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.75 }}
                    >
                      secure = true;
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.95 }}
                    >
                      scalable = true;
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.15 }}
                      className="text-emerald-200"
                    >
                      status = "ready";
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>

            <FloatingBadge
              delay={0.1}
              className="absolute -left-3 top-16 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm backdrop-blur-xl sm:-left-10"
            >
              <span className="flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-cyan-200" />
                OnTime Group
              </span>
            </FloatingBadge>

            <FloatingBadge
              delay={0.6}
              className="absolute -right-3 bottom-20 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm backdrop-blur-xl sm:-right-8"
            >
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-200" />
                Amazon ML · Top 5%
              </span>
            </FloatingBadge>
          </div>

          <ScrollCue />
        </section>

        <SignatureStrip />

        <section className="pb-16">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <SpotlightCard key={stat.label} className="p-5">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-white/48">{stat.label}</p>
              </SpotlightCard>
            ))}
          </motion.div>
        </section>

        <section className="pb-20">
          <div className="overflow-hidden rounded-full border border-white/10 bg-white/[0.035] py-4">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="flex min-w-max gap-3"
            >
              {[...technologies, ...technologies].map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="mx-1 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/60"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 py-16">
          <SectionHeading
            eyebrow="About"
            title="Backend-first. Product-minded."
            copy="Secure systems, clean interfaces, real workflows."
          />

          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <SpotlightCard className="p-6 sm:p-8">
  <p className="max-w-3xl text-lg leading-8 text-white/68">
    I build end-to-end software across attendance, farm operations, safety,
    voting, and healthcare workflows. My work usually starts from backend
    architecture — APIs, authentication, databases, and business logic — and
    extends into clean frontend experiences that make the system easy to use. I
    enjoy turning real-world problems into reliable products that are practical,
    secure, and ready for actual users.
  </p>
</SpotlightCard>

            <SpotlightCard className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <GraduationCap className="mt-1 h-6 w-6 text-cyan-200" />

                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-white/40">
                    Education
                  </p>

                  <h3 className="mt-3 text-xl font-semibold">
                    {education.degree}
                  </h3>

                  <p className="mt-2 leading-7 text-white/60">
                    {education.college}
                  </p>

                  <p className="mt-2 text-sm text-white/45">
                    {education.period} · {education.cgpa}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </section>

        <section id="services" className="scroll-mt-28 py-16">
          <SectionHeading eyebrow="Build" title="What I do." />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = iconMap[index] ?? Code2;

              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease }}
                  className={serviceGridClass(index)}
                >
                  <SpotlightCard className="h-full p-6">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.08] transition group-hover:bg-cyan-200 group-hover:text-slate-950">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold">
                      {service.title}
                    </h3>

                    <p className="mt-3 leading-7 text-white/58">
                      {service.description}
                    </p>
                  </SpotlightCard>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="projects" className="scroll-mt-28 py-16">
          <SectionHeading eyebrow="Work" title="Selected projects." />

          <div className="grid gap-5 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, delay: index * 0.06, ease }}
                className={projectGridClass(index)}
              >
                <SpotlightCard className="h-full p-5 sm:p-6">
                  <ProjectVisual title={project.title} />

                  <div className="mt-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-cyan-100/65">
                        {project.category}
                      </p>

                      {index === 0 ? (
                        <span className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.08] px-3 py-1 text-xs text-cyan-100/80">
                          Featured
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em]">
                      {project.title}
                    </h3>

                    <p className="mt-3 leading-7 text-white/60">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-xs text-white/55"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-28 py-16">
          <SectionHeading eyebrow="Experience" title="Where I worked." />

          <div className="relative ml-3 border-l border-white/10 pl-7 sm:ml-4 sm:pl-10">
            {experience.map((item, index) => (
              <motion.article
                key={`${item.company}-${item.period}`}
                initial={{ opacity: 0, x: -22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.72, delay: index * 0.08, ease }}
                className="relative mb-5 last:mb-0"
              >
                <span className="absolute -left-[2.15rem] top-8 h-3 w-3 rounded-full border border-cyan-200/50 bg-cyan-200 shadow-[0_0_24px_rgba(165,243,252,0.65)] sm:-left-[2.9rem]" />

                <SpotlightCard className="p-6">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em]">
                        {item.role}
                      </h3>

                      <p className="mt-1 text-white/58">{item.company}</p>
                    </div>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/45">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-4 leading-7 text-white/62">
                    {item.details[0]}
                  </p>
                </SpotlightCard>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="py-16">
          <SectionHeading eyebrow="Skills" title="Tech stack." />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.06, ease }}
              >
                <SpotlightCard className="h-full p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{group.title}</h3>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/35">
                      {group.skills.length}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-black/15 px-3 py-1.5 text-sm text-white/58 transition hover:border-cyan-200/25 hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="py-16">
          <SectionHeading eyebrow="Highlights" title="Achievements." />

          <SpotlightCard className="p-6">
            <div className="flex flex-wrap gap-3">
              {achievements.map((achievement) => (
                <span
                  key={achievement}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/65"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </section>

        <section id="contact" className="scroll-mt-28 py-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease }}
            className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.055] p-7 backdrop-blur sm:p-10 lg:p-12"
          >
            <div className="absolute right-[-5rem] top-[-5rem] h-56 w-56 rounded-full bg-cyan-300/15 blur-3xl" />
            <div className="absolute bottom-[-7rem] left-[-4rem] h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
                  Contact
                </p>

                <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.055em] sm:text-4xl lg:text-5xl">
                  Let’s build something useful.
                </h2>

                <div className="mt-7 flex flex-wrap gap-3">
                  <GradientButton href={`mailto:${profile.email}`}>
                    Start a conversation
                    <ArrowUpRight className="h-4 w-4" />
                  </GradientButton>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/15 p-4 transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <Mail className="h-5 w-5 text-cyan-200" />
                  <span>{profile.email}</span>
                </a>

                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/15 p-4 transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <Phone className="h-5 w-5 text-cyan-200" />
                  <span>{profile.phone}</span>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/15 p-4 transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <FaLinkedinIn className="h-5 w-5 text-cyan-200" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-white/10 py-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {profile.name}</p>

          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              LinkedIn
            </a>

            <a
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              LeetCode
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}