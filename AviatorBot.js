import { useState } from "react";

export default function AviatorBot() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const analyze = () => {
    const data = input
      .split(/[^\d.]+/)
      .map(parseFloat)
      .filter((x) => !isNaN(x));

    const last5 = data.slice(-5);
    const last10 = data.slice(-10);

    const recentSpike = last10.some((x) => x >= 8);
    const under2x = last5.filter((x) => x < 2).length;
    const under1_5 = last5.filter((x) => x < 1.5).length;

    let decision = "SKIP";
    let reason = "It is safer to wait. Conditions are stable or risky.";

    if (!recentSpike && under2x >= 3) {
      decision = "ENTER";
      reason = "More than 3 of the last 5 rounds were under 2x, and no big spike has occurred recently. A spike may be coming soon.";
    } else if (recentSpike) {
      decision = "SKIP";
      reason = "There was a big spike (above 8x) in the last 10 rounds. The system may now enter a cooldown with crash rounds.";
    } else if (under1_5 >= 4) {
      decision = "ENTER";
      reason = "There is a crash streak happening (at least 4 of the last 5 rounds were under 1.5x). A rebound may be coming soon.";
    }

    setResult({ last5, decision, reason });
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h2>Aviator Crash Predictor</h2>
      <input
        type="text"
        placeholder="Paste the last 10 results here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={analyze} style={{ padding: '0.5rem 1rem' }}>Check Prediction</button>

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <p>Last 5 Results: [{result.last5.join(", ")}]</p>
          <p>
            <strong>Recommendation:</strong>{" "}
            {result.decision === "ENTER" ? "ENTER ✅" : "SKIP ❌"}
          </p>
          <p><em>Reason: {result.reason}</em></p>
        </div>
      )}
    </div>
  );
}
