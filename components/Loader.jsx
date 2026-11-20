import { LogoMark } from "./Logo";

export function Spinner({ className = "" }) {
  return <span className={`loading loading-spinner text-primary ${className}`} aria-label="Loading" />;
}

// Full-area loading screen used by route-level loading.js and private route guards.
export default function Loader({ label = "Loading...", fullScreen = false }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-5 ${fullScreen ? "min-h-screen" : "min-h-[60vh]"}`} role="status">
      <div className="relative flex size-20 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <LogoMark size={38} />
      </div>
      <p className="text-sm font-semibold muted">{label}</p>
    </div>
  );
}
