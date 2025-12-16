"use client";

export default function FloatingCTA() {
  return (
    <a
      href="https://wa.me/51936230958"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-terracota text-crema px-4 py-2 shadow-lg hover:bg-madera transition-colors text-xs font-semibold tracking-[0.16em] uppercase"
    >
      <span className="text-lg">✶</span>
      <span>Habla con el estudio</span>
    </a>
  );
}
