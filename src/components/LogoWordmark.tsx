const FONT_STACK =
  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

interface LogoWordmarkProps {
  className?: string;
  /** Em fundos escuros, o nome e o "&" passam a branco. */
  variant?: "default" | "light";
}

export default function LogoWordmark({ className, variant = "default" }: LogoWordmarkProps) {
  const nameColor = variant === "light" ? "#ffffff" : "var(--silva-blue-dark)";
  return (
    <svg
      viewBox="0 3.67 340 88"
      className={className}
      role="img"
      aria-label="Silva Aquecimento & Hidráulica"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="52"
        fontFamily={FONT_STACK}
        fontSize="66"
        fontWeight="700"
        letterSpacing="-1.5"
        fill={nameColor}
      >
        SILVA
      </text>
      <text
        x="2"
        y="84"
        fontFamily={FONT_STACK}
        fontSize="21.5"
        fontWeight="600"
        letterSpacing="0.3"
        fill="var(--silva-terracotta)"
      >
        AQUECIMENTO
        <tspan fill={nameColor}> &amp; </tspan>
        <tspan fill="var(--silva-blue-pastel)">HIDRÁULICA</tspan>
      </text>
    </svg>
  );
}
