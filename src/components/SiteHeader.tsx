import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MotifStrip } from "./Ornament";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse Records" },
  { to: "/create", label: "Create Record" },
  { to: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <MotifStrip />
      <div
        className={`border-b border-border transition-[background-color,box-shadow] duration-200 ease-out ${
          scrolled
            ? "bg-background/85 shadow-[0_1px_0_rgba(43,24,16,0.04)] backdrop-blur-md"
            : "bg-background"
        }`}
      >
        <div className="container-etno flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link to="/" className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid size-9 place-items-center rounded-sm bg-primary text-[13px] font-semibold tracking-[0.05em] text-primary-foreground"
            >
              EM
            </span>
            <span className="font-serif text-xl font-semibold tracking-tight text-ink">
              EtnoMK
              <span className="ml-2 hidden text-[13px] font-normal tracking-[0.05em] text-ink-muted uppercase sm:inline">
                Digital archive
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => {
              const active =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group relative py-2 text-[15px] text-ink-muted transition-colors duration-150 ease-out hover:text-ink"
                >
                  <span className={active ? "font-medium text-ink" : ""}>{item.label}</span>
                  <span
                    aria-hidden
                    className={`absolute -bottom-px left-0 h-0.5 bg-gold transition-[width] duration-200 ease-out ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <Link
              to="/auth"
              className="text-[15px] text-ink-muted transition-colors duration-150 ease-out hover:text-ink"
            >
              Sign in
            </Link>
            <Link
              to="/create"
              className="rounded-sm bg-primary px-6 py-3 text-[15px] font-medium text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary-dark"
            >
              Add Record
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid size-11 place-items-center rounded-sm border border-border text-ink transition-colors duration-150 ease-out hover:bg-surface-alt lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* Slide-in drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-[rgba(43,24,16,0.5)] transition-opacity duration-250 ease-in-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute top-0 right-0 flex h-full w-[300px] max-w-[85vw] flex-col bg-background shadow-panel transition-transform duration-250 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <span className="label-caps">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-sm text-ink"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-2 p-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex min-h-11 items-center border-b border-border/70 py-3 font-serif text-lg text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/auth" className="flex min-h-11 items-center py-3 text-ink-muted">
              Sign in
            </Link>
            <Link
              to="/create"
              className="mt-4 flex min-h-11 items-center justify-center rounded-sm bg-primary px-6 py-3 font-medium text-primary-foreground"
            >
              Add Record
            </Link>
          </nav>
        </aside>
      </div>
    </header>
  );
}
