/** Dark gym atmosphere with La Forza red tint — sits behind all app screens. */
export function AppBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <img
        src="/gym-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-[0.22]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/92 via-[#0a0a0a]/88 to-[#050505]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(237,28,36,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(237,28,36,0.08),transparent_45%)]" />
    </div>
  );
}
