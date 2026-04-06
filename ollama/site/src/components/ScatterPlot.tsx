import { useMemo, useState, useCallback } from 'react';
import { Group } from '@visx/group';
import { scaleLog } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { Circle } from '@visx/shape';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import type { Model } from '../types';
import { parseParams, formatBytes } from '../utils';

interface ScatterPlotProps {
  models: Model[];
  width?: number;
  height?: number;
}

interface Datum {
  model: Model;
  sizeBytes: number;
  paramsBillions: number;
}

const margin = { top: 20, right: 30, bottom: 65, left: 65 };

const tooltipStyles = {
  ...defaultStyles,
  backgroundColor: '#111827',
  color: '#fff',
  fontSize: '13px',
  padding: '8px 12px',
  borderRadius: '6px',
};

/**
 * Compute log-spaced tick values at powers of 10 (and optionally ×3 steps)
 * within [domainMin, domainMax], thinned so that consecutive ticks are at
 * least `minPixelGap` pixels apart on the given scale.
 */
function logTicks(
  domainMin: number,
  domainMax: number,
  pixelRange: number,
  minPixelGap: number,
): number[] {
  const logMin = Math.floor(Math.log10(domainMin));
  const logMax = Math.ceil(Math.log10(domainMax));

  // Candidate tick positions: powers of 10 and ×3 intermediate
  const candidates: number[] = [];
  for (let e = logMin - 1; e <= logMax + 1; e++) {
    candidates.push(Math.pow(10, e));
    candidates.push(3 * Math.pow(10, e));
  }

  // Filter to within domain
  const inRange = candidates
    .filter((v) => v >= domainMin * 0.99 && v <= domainMax * 1.01)
    .sort((a, b) => a - b);

  // Convert each value to a pixel position: pixel = log(v/domainMin)/log(domainMax/domainMin) * pixelRange
  const toPixel = (v: number) =>
    (Math.log10(v / domainMin) / Math.log10(domainMax / domainMin)) * pixelRange;

  // Greedy thinning: keep a tick only if it's far enough from the last kept one
  const kept: number[] = [];
  let lastPixel = -Infinity;
  for (const v of inRange) {
    const px = toPixel(v);
    if (px - lastPixel >= minPixelGap) {
      kept.push(v);
      lastPixel = px;
    }
  }
  return kept;
}

export function ScatterPlot({ models, width = 900, height = 380 }: ScatterPlotProps) {
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const data = useMemo<Datum[]>(() => {
    return models
      .map((m) => ({
        model: m,
        sizeBytes: m.default_size_bytes ?? 0,
        paramsBillions: parseParams(m.default_params),
      }))
      .filter((d) => d.sizeBytes > 0 && d.paramsBillions > 0);
  }, [models]);

  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const xDomain = useMemo<[number, number]>(
    () => [
      Math.max(1e8, Math.min(...data.map((d) => d.sizeBytes)) * 0.5),
      Math.max(...data.map((d) => d.sizeBytes)) * 1.3,
    ],
    [data],
  );

  const yDomain = useMemo<[number, number]>(
    () => [
      Math.max(0.01, Math.min(...data.map((d) => d.paramsBillions)) * 0.5),
      Math.max(...data.map((d) => d.paramsBillions)) * 1.3,
    ],
    [data],
  );

  const xScale = useMemo(
    () =>
      scaleLog<number>({
        domain: xDomain,
        range: [0, innerW],
        nice: true,
      }),
    [xDomain, innerW],
  );

  const yScale = useMemo(
    () =>
      scaleLog<number>({
        domain: yDomain,
        range: [innerH, 0],
        nice: true,
      }),
    [yDomain, innerH],
  );

  // Compute tick values with guaranteed minimum pixel gap to prevent overlap
  // X: rotated labels ~40px tall, Y: horizontal labels ~14px tall
  const xTickValues = useMemo(
    () => logTicks(xDomain[0], xDomain[1], innerW, 70),
    [xDomain, innerW],
  );
  const yTickValues = useMemo(
    () => logTicks(yDomain[0], yDomain[1], innerH, 28),
    [yDomain, innerH],
  );

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<Datum>();

  const handleMouseMove = useCallback(
    (datum: Datum) => (event: React.MouseEvent<SVGCircleElement>) => {
      const point = localPoint(event);
      if (!point) return;
      showTooltip({
        tooltipData: datum,
        tooltipLeft: point.x,
        tooltipTop: point.y,
      });
      setHoveredName(datum.model.name);
    },
    [showTooltip],
  );

  const handleMouseLeave = useCallback(() => {
    hideTooltip();
    setHoveredName(null);
  }, [hideTooltip]);

  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-[var(--color-secondary)]">
        No models with both size and parameter data to chart.
      </div>
    );
  }

  return (
    <div className="relative">
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={yScale}
            width={innerW}
            stroke="var(--color-border)"
            strokeOpacity={0.5}
            strokeDasharray="2,3"
          />
          <GridColumns
            scale={xScale}
            height={innerH}
            stroke="var(--color-border)"
            strokeOpacity={0.5}
            strokeDasharray="2,3"
          />

          {data.map((d) => {
            const cx = xScale(d.sizeBytes);
            const cy = yScale(d.paramsBillions);
            const isHovered = hoveredName === d.model.name;
            return (
              <Circle
                key={d.model.name}
                cx={cx}
                cy={cy}
                r={isHovered ? 6 : 4}
                fill={isHovered ? 'var(--color-accent)' : 'var(--color-accent)'}
                fillOpacity={isHovered ? 1 : 0.55}
                stroke={isHovered ? 'var(--color-primary)' : 'none'}
                strokeWidth={1.5}
                style={{ cursor: 'pointer', transition: 'r 0.1s' }}
                onMouseMove={handleMouseMove(d)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}

          <AxisBottom
            scale={xScale}
            top={innerH}
            label="Default Tag File Size"
            labelClassName="fill-[var(--color-secondary)] text-xs"
            tickValues={xTickValues}
            tickFormat={(v) => formatBytes(v as number)}
            stroke="var(--color-border)"
            tickStroke="var(--color-border)"
            tickLabelProps={() => ({
              fill: 'var(--color-secondary)',
              fontSize: 10,
              textAnchor: 'end' as const,
              angle: -35,
              dx: '-0.3em',
              dy: '0.15em',
            })}
          />
          <AxisLeft
            scale={yScale}
            label="Parameter Count (Billions)"
            labelClassName="fill-[var(--color-secondary)] text-xs"
            labelOffset={45}
            tickValues={yTickValues}
            tickFormat={(v) => {
              const n = v as number;
              return n >= 1 ? `${n}B` : `${(n * 1000).toFixed(0)}M`;
            }}
            stroke="var(--color-border)"
            tickStroke="var(--color-border)"
            tickLabelProps={() => ({
              fill: 'var(--color-secondary)',
              fontSize: 10,
              textAnchor: 'end' as const,
            })}
          />
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div className="font-semibold">{tooltipData.model.name}</div>
          <div>
            {tooltipData.model.default_params ?? '—'} · {formatBytes(tooltipData.sizeBytes)}
          </div>
          {tooltipData.model.default_quant && (
            <div className="opacity-70">{tooltipData.model.default_quant}</div>
          )}
        </TooltipWithBounds>
      )}
    </div>
  );
}
