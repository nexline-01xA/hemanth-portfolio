import { SIGNAL_STATS } from "../data/site.js";

export default function SignalStrip() {
  return (
    <div className="signal-strip">
      <div className="container">
        <div className="signal-strip__row">
          {SIGNAL_STATS.map((s) => (
            <div className="signal-strip__item" key={s.label}>
              <div className="signal-strip__value">{s.value}</div>
              <div className="signal-strip__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
