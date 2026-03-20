import React from 'react';

const TEXT = '#E8E8E8';
const TEXT_DIM = '#8B949E';

export default function PullQuote({ value, unit, context }) {
  return (
    <div style={{ marginBottom: context ? 8 : 20 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 72,
          fontWeight: 200,
          lineHeight: 0.9,
          color: TEXT,
        }}>
          {value}
        </span>
        <span style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 18,
          fontWeight: 300,
          color: TEXT_DIM,
        }}>
          {unit}
        </span>
      </div>
      {context && (
        <div style={{
          fontSize: 13,
          color: TEXT_DIM,
          marginTop: 6,
        }}>
          {context}
        </div>
      )}
    </div>
  );
}
