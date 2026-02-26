"use client";

import { useState, useCallback } from "react";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/sissississi-013" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sissi-wang-703429370/" },
  { label: "X", href: "https://x.com/sissississi_013" },
  { label: "Are.na", href: "https://are.na/sissi-wang" },
];

const EMAIL = "sissiwang@berkeley.edu";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <>
      {/* Fixed image layer */}
      <img
        src="/footer-bg.jpg"
        alt=""
        className="fixed bottom-0 left-0 w-full h-[320px] object-cover object-center -z-10 pointer-events-none"
      />

      {/* Fixed light overlay */}
      <div className="fixed bottom-0 left-0 w-full h-[320px] bg-black/15 -z-[5] pointer-events-none" />

      {/* Fixed content — z-[5] so it's above the spacer but below main (z-10) */}
      <div className="fixed bottom-0 left-0 w-full h-[320px] flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-12 pb-8 z-[5]">
        <div />

        <div className="text-white">
          <div className="relative inline-block">
            <button
              onClick={copyEmail}
              className="text-xl md:text-3xl font-light tracking-wide lowercase mb-3 text-white hover:text-white/80 transition-colors cursor-pointer"
            >
              sissiwang [at] berkeley [dot] edu
            </button>
            {copied && (
              <img
                src="/copied.png"
                alt="Copied!"
                className="absolute left-full top-1/2 -translate-y-1/2 ml-6 h-8 md:h-10 animate-fade-in"
              />
            )}
          </div>
          <p className="text-xs text-white/40 lowercase tracking-wider">
            updated {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex gap-5">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs lowercase tracking-wide text-white/40 hover:text-white/90 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Transparent spacer — just reserves scroll space */}
      <footer className="relative w-full h-[320px] bg-transparent pointer-events-none" />
    </>
  );
}
