"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CursorFollower } from "./CursorFollower";
// import { FloatingCodeSnippets } from "./FloatingCodeSnippets";

export function Hero() {
  const router = useRouter();

  const handleStartSharing = () => {
    router.push("/test");
  };

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Cursor follower effect */}
      <CursorFollower />

      {/* Magenta Orb Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "white",
          backgroundImage: `
     linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
     linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
     radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
   `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />
      {/* Floating code snippets background */}
      {/* <FloatingCodeSnippets /> */}

      {/* Glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center max-w-4xl mx-auto">
        {/* Main headline with scramble effect */}
        <h1 className="hero-headline mb-6 animate-fade-in-up">
          Write. Share. Learn. Collaborate
        </h1>

        {/* Subtext */}
        <p className="hero-subtext mb-12 animate-fade-in-up animation-delay-200">
          Write. Share. Inspire others with your snippets.
        </p>

        {/* CTA Button */}
        <Button
          onClick={handleStartSharing}
          size="lg"
          className="animate-fade-in-up animation-delay-400 transition-colors duration-300 hover:bg-black hover:text-white"
        >
          Start Sharing
        </Button>

        {/* Footer tagline */}
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500 font-mono animate-fade-in animation-delay-600">
          Built for devs who love to create.
        </p>
      </div>
    </div>
  );
}
