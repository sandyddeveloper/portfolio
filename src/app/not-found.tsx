import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#040508] text-[#D8D8D8] px-6 text-center">
      <span className="text-xs font-mono uppercase tracking-widest text-[#9C9C9C] mb-4 block">
        404 ✦ Page Not Found
      </span>
      <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6">
        Lost in space.
      </h1>
      <p className="text-sm font-sans text-[#9C9C9C] max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or has been moved to another coordinate.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#E6E4E2] transition-colors"
      >
        Return Home
      </Link>
    </main>
  );
}
