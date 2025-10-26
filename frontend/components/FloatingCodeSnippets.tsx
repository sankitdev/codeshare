"use client";

const codeSnippets = [
  { text: "{ }", left: "10%", top: "20%", delay: "0s", duration: "18s" },
  { text: "< />", left: "25%", top: "70%", delay: "1s", duration: "20s" },
  { text: "=>", left: "50%", top: "30%", delay: "2s", duration: "22s" },
  { text: "( )", left: "75%", top: "10%", delay: "0.5s", duration: "19s" },
  { text: "[ ]", left: "80%", top: "60%", delay: "3s", duration: "23s" },
  { text: "function", left: "40%", top: "50%", delay: "1.5s", duration: "17s" },
  { text: "const", left: "5%", top: "80%", delay: "2.5s", duration: "21s" },
  { text: "return", left: "60%", top: "40%", delay: "1s", duration: "25s" },
  { text: "import", left: "15%", top: "35%", delay: "0.8s", duration: "19s" },
  { text: "export", left: "30%", top: "15%", delay: "2s", duration: "24s" },
  { text: "async", left: "45%", top: "65%", delay: "1.2s", duration: "18s" },
  { text: "await", left: "55%", top: "75%", delay: "0s", duration: "20s" },
  { text: "class", left: "65%", top: "25%", delay: "2.2s", duration: "22s" },
  { text: "interface", left: "70%", top: "50%", delay: "1.8s", duration: "26s" },
  { text: "type", left: "35%", top: "60%", delay: "0.5s", duration: "17s" },
  { text: "useState", left: "85%", top: "45%", delay: "1.3s", duration: "19s" },
  { text: "useEffect", left: "50%", top: "85%", delay: "2.7s", duration: "23s" },
  { text: "map()", left: "20%", top: "10%", delay: "0.3s", duration: "18s" },
  { text: "filter()", left: "90%", top: "30%", delay: "2s", duration: "20s" },
  { text: "reduce()", left: "10%", top: "55%", delay: "1.7s", duration: "21s" },
];

export function FloatingCodeSnippets() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSnippets.map(({ text, left, top, delay, duration }, index) => (
        <div
          key={index}
          className="floating-snippet"
          style={{
            left,
            top,
            animationDelay: delay,
            animationDuration: duration,
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
}
