export default function SleepStages({ stages, width = 300, height = 24 }) {
  if (!stages || stages.length === 0) return null;
  const total = stages.reduce((s, st) => s + st.minutes, 0);
  let x = 0;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {stages.map((st, i) => {
        const w = (st.minutes / total) * width;
        const rect = <rect key={i} x={x} y={0} width={w} height={height} rx={4} fill={st.color} />;
        x += w;
        return rect;
      })}
    </svg>
  );
}
