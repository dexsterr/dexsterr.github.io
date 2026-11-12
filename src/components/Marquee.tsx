interface Props {
  items: string[];
  /** seconds for one full loop */
  speed?: number;
  reverse?: boolean;
}

/**
 * Seamless infinite marquee. Renders the item list twice inside a track that
 * translates -50%, so the loop is gapless. CSS-driven; pauses on hover.
 */
const Marquee = ({ items, speed = 28, reverse = false }: Props) => {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {row.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
