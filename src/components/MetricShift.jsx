import { IconArrowRight } from "./Icons.jsx";

/**
 * Editorial visualization of a research result — real verified numbers
 * presented as typographic metadata, not a fabricated chart.
 *
 * metric.type === "collapse": before -> after, with a delta emphasised.
 * metric.type === "compare":  two values side by side (e.g. model vs
 *   baseline), with optional supporting context stats.
 */
export default function MetricShift({ metric, compact = false }) {
  if (!metric) return null;

  if (metric.type === "stats") {
    return (
      <div className="metric-shift">
        {metric.items.map((item, i) => (
          <div className="metric-shift__block" key={item.label}>
            <span className={i === 0 ? "metric-shift__value metric-shift__value--hot" : "metric-shift__value metric-shift__value--dim"}>{item.value}</span>
            <span className="metric-shift__label">{item.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (metric.type === "collapse") {
    return (
      <div className="metric-shift">
        <div className="metric-shift__block">
          <span className="metric-shift__value metric-shift__value--dim">{metric.before}</span>
          <span className="metric-shift__label">{metric.beforeLabel}</span>
        </div>
        <IconArrowRight size={compact ? 14 : 18} className="metric-shift__arrow" />
        <div className="metric-shift__block">
          <span className="metric-shift__value">{metric.after}</span>
          <span className="metric-shift__label">{metric.afterLabel}</span>
        </div>
        <div className="metric-shift__delta">
          <span className="metric-shift__value">{metric.delta}</span>
          <span className="metric-shift__label">{metric.deltaLabel}</span>
        </div>
      </div>
    );
  }

  if (metric.type === "compare") {
    return (
      <div className="metric-shift">
        <div className="metric-shift__block">
          <span className="metric-shift__value metric-shift__value--hot">{metric.a}</span>
          <span className="metric-shift__label">{metric.aLabel}</span>
        </div>
        <div className="metric-shift__block">
          <span className="metric-shift__value metric-shift__value--dim">{metric.b}</span>
          <span className="metric-shift__label">{metric.bLabel}</span>
        </div>
        {metric.context && (
          <div className="metric-shift__context">
            {metric.context.map((c) => (
              <div className="metric-shift__block" key={c.label}>
                <span className="metric-shift__value">{c.value}</span>
                <span className="metric-shift__label">{c.label}</span>
              </div>
            ))}
          </div>
        )}
        {metric.note && !compact && <p className="metric-shift__note">{metric.note}</p>}
      </div>
    );
  }

  return null;
}
