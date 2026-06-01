export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Dotted Pattern - Top Right */}
      <div className="absolute top-10 right-10 grid grid-cols-6 gap-3 opacity-20">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-blue-400"></div>
        ))}
      </div>

      {/* Wave Shape 1 - Bottom */}
      <div
        className="absolute bottom-0 left-0 w-full h-40 opacity-30"
        style={{
          background: "white",
          borderRadius: "100% 100% 0 0 / 60px 60px 0 0",
        }}
      ></div>

      {/* Wave Shape 2 */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 opacity-50"
        style={{
          background: "white",
          borderRadius: "80% 80% 0 0 / 40px 40px 0 0",
        }}
      ></div>

      {/* Soft Blob */}
      <div
        className="absolute -bottom-20 -left-20 w-96 h-96 opacity-10"
        style={{
          background: "radial-gradient(circle, #93C5FD, transparent)",
        }}
      ></div>

    </div>
  );
}