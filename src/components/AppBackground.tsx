/** Dark gym atmosphere — matches @laforzagyms social post aesthetic. */
export function AppBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-forza-ink" aria-hidden>
      <img
        src="/gym-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-[0.28]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forza-ink/88 via-forza-ink/82 to-forza-ink/94" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(224,30,30,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,rgba(224,30,30,0.06),transparent_45%)]" />
    </div>
  );
}
