import { useMemo } from 'react';
import { motion } from 'framer-motion';

const WIDTH = 1400;
const HEIGHT = 340;
const CENTER_Y = HEIGHT / 2;
const SAMPLES = 320;

export type WaveformVariant = 'full' | 'noise' | 'clean';

/** Deterministic pseudo-noise: a sum of incommensurate sines, not Math.random,
 * so the waveform renders identically on every pass. */
function noise(x: number): number {
  return (
    Math.sin(x * 0.083) * 0.45 +
    Math.sin(x * 0.191 + 1.7) * 0.3 +
    Math.sin(x * 0.37 + 0.4) * 0.16 +
    Math.sin(x * 0.71 + 2.9) * 0.09
  );
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

/** Builds a waveform path for the given variant: 'full' resolves raw jitter
 * into one clean pulse; 'noise' and 'clean' hold a single state end to end,
 * used side by side as the noise-vs-signal comparison. */
function buildPath(variant: WaveformVariant): string {
  const pts: string[] = [];

  for (let i = 0; i <= SAMPLES; i++) {
    const x = (i / SAMPLES) * WIDTH;
    const t = i / SAMPLES;

    let noiseEnvelope = 0;
    let signalEnvelope = 0;

    if (variant === 'noise') {
      noiseEnvelope = 1;
    } else if (variant === 'clean') {
      signalEnvelope = 1;
    } else {
      noiseEnvelope = 1 - clamp01((t - 0.02) / 0.5);
      signalEnvelope = clamp01((t - 0.32) / 0.28);
    }

    const noiseY = noise(x) * 58 * noiseEnvelope;
    const signalY = Math.sin(x * 0.0135 - 1.2) * 64 * signalEnvelope;

    const y = CENTER_Y + noiseY + signalY;
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return pts.join(' ');
}

interface SignalWaveformProps {
  className?: string;
  variant?: WaveformVariant;
  /** Renders a large blurred radial glow behind the line for a cinematic,
   * full-bleed hero treatment. Off by default for compact/mini uses. */
  ambient?: boolean;
  /** Suppresses the color ramp for the 'noise' variant so it reads as dull,
   * unresolved static rather than a second accent color. */
  dim?: boolean;
}

const SignalWaveform = ({ className = '', variant = 'full', ambient = false, dim = false }: SignalWaveformProps) => {
  const gradientId = useMemo(() => `signal-line-${variant}-${dim ? 'dim' : 'live'}`, [variant, dim]);
  const glowId = useMemo(() => `signal-glow-${variant}-${dim ? 'dim' : 'live'}`, [variant, dim]);
  const d = useMemo(() => buildPath(variant), [variant]);

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {ambient && (
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{ background: 'var(--gradient-signal-radial)', filter: 'blur(40px)', transform: 'scale(1.3)' }}
        />
      )}

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
        role="presentation"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {variant === 'noise' ? (
              dim ? (
                <>
                  <stop offset="0%" stopColor="hsl(240 6% 22%)" />
                  <stop offset="100%" stopColor="hsl(240 6% 30%)" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="hsl(30 8% 40%)" />
                  <stop offset="100%" stopColor="hsl(30 8% 52%)" />
                </>
              )
            ) : variant === 'clean' ? (
              <>
                <stop offset="0%" stopColor="hsl(231 97% 61%)" />
                <stop offset="100%" stopColor="hsl(258 90% 66%)" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="hsl(30 8% 45%)" />
                <stop offset="34%" stopColor="hsl(30 8% 55%)" />
                <stop offset="52%" stopColor="hsl(231 97% 61%)" />
                <stop offset="100%" stopColor="hsl(258 90% 66%)" />
              </>
            )}
          </linearGradient>
          <filter id={glowId} x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation={variant === 'noise' ? 6 : 12} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line x1={0} y1={CENTER_Y} x2={WIDTH} y2={CENTER_Y} stroke="hsl(240 6% 18%)" strokeWidth={1} />

        {/* Glow pass */}
        <motion.path
          d={d}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={variant === 'noise' ? 2 : 3}
          strokeLinecap="round"
          filter={`url(#${glowId})`}
          opacity={variant === 'noise' ? 0.35 : 0.6}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Crisp line */}
        <motion.path
          d={d}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={variant === 'noise' ? 1.5 : 2.25}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Traveling pulse — only on the states that carry real signal */}
        {variant !== 'noise' && (
          <circle r={5} fill="hsl(258 90% 78%)" filter={`url(#${glowId})`} opacity={0}>
            <animateMotion
              path={d}
              keyPoints={variant === 'clean' ? '0;1' : '0.46;1'}
              keyTimes="0;1"
              calcMode="linear"
              dur="2.6s"
              begin="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.05;0.9;1"
              dur="2.6s"
              begin="2.4s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>
    </div>
  );
};

export default SignalWaveform;
