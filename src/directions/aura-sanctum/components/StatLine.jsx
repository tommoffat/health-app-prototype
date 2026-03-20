import React from 'react';
import { TEXT, TEXT_DIM, CREAM, BORDER, RECOVERY, STRAIN, GOLD } from '../palette.js';

const trendColors = {
  up: RECOVERY,
  down: STRAIN,
  normal: TEXT_DIM,
  optimal: RECOVERY,
};

export default function StatLine({ label, value, trend, trendLabel, showBorder = true }) {
  const trendColor = trendColors[trend] || TEXT_DIM;
  const trendArrow = trend === 'up' ? '\u2191' : trend === 'down' ? '\u2193' : trend === 'optimal' ? '\u2713' : '\u2192';
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 0',
      borderBottom: showBorder ? `1px solid ${BORDER}` : 'none',
    }}>
      <span style={{ color: TEXT_DIM, fontSize: 14, letterSpacing: 0.2 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: CREAM, fontSize: 15, fontWeight: 500 }}>{value}</span>
        {trendLabel && (
          <span style={{ color: trendColor, fontSize: 12, fontWeight: 500 }}>
            {trendArrow} {trendLabel}
          </span>
        )}
      </div>
    </div>
  );
}
