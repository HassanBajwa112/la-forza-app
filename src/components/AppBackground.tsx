/** Premium atmosphere — gym texture at whisper opacity, logo colors only. */
export function AppBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-forza-white" aria-hidden>
      <img
        src="/gym-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-[0.045]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forza-white via-forza-white/97 to-forza-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(212,16,11,0.09),transparent_52%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,rgba(212,16,11,0.05),transparent_40%)]" />
    </div>
  );
}
