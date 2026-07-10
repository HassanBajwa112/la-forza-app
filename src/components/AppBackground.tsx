/** Clean white canvas with a soft La Forza red wash — logo colors only. */
export function AppBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-forza-white" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,16,11,0.07),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(212,16,11,0.04),transparent_45%)]" />
    </div>
  );
}
