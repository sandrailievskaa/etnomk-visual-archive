import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImage from "@/assets/hero-embroidery.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — EtnoMK archive" },
      {
        name: "description",
        content: "Sign in or register to catalogue and manage records in the EtnoMK archive.",
      },
      { property: "og:title", content: "Sign in — EtnoMK archive" },
      {
        property: "og:description",
        content: "Access the EtnoMK cataloguing tools for Macedonian textile heritage.",
      },
    ],
  }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="relative flex min-h-[calc(100vh-160px)] items-center justify-center overflow-hidden px-6 py-16">
      <img
        src={heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full scale-105 object-cover blur-lg"
      />
      <div className="absolute inset-0 bg-[rgba(43,24,16,0.35)]" />

      <div className="stitch-in relative w-full max-w-md overflow-hidden rounded-xl bg-surface shadow-panel">
        <div className="h-1 w-full bg-gold" />
        <div className="p-8">
          <h1 className="font-serif text-[28px] text-ink">
            {mode === "login" ? "Sign in" : "Create an account"}
          </h1>
          <p className="mt-2 text-[15px] text-ink-muted">
            {mode === "login"
              ? "Access cataloguing and similarity search tools."
              : "Register to contribute records to the archive."}
          </p>

          <form onSubmit={(event) => event.preventDefault()} className="mt-8 space-y-6">
            {mode === "register" && (
              <label className="block">
                <span className="label-caps">Full name</span>
                <input className={`${inputClass} mt-2`} placeholder="Name Surname" />
              </label>
            )}
            <label className="block">
              <span className="label-caps">Email</span>
              <input type="email" className={`${inputClass} mt-2`} placeholder="you@museum.mk" />
            </label>
            <label className="block">
              <span className="label-caps">Password</span>
              <input type="password" className={`${inputClass} mt-2`} placeholder="••••••••" />
            </label>
            <button
              type="submit"
              className="min-h-11 w-full rounded-sm bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary-dark"
            >
              {mode === "login" ? "Sign in" : "Register"}
            </button>
          </form>

          <p className="mt-6 text-[15px] text-ink-muted">
            {mode === "login" ? "No account yet?" : "Already registered?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {mode === "login" ? "Create one" : "Sign in"}
            </button>
          </p>
          <Link to="/browse" className="mt-4 block text-[13px] text-ink-muted hover:text-ink">
            Continue browsing without an account
          </Link>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "min-h-12 w-full rounded-sm border-[1.5px] border-border bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-ink-muted focus:border-gold focus:ring-2 focus:ring-gold/40 focus:outline-none";
