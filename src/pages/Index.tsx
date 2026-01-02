import { useState, useEffect } from "react";

export default function Index() {
  const [f, setF] = useState("");
  const [n, setN] = useState("");

  const fortunes = {
    love: ["New sparks ignite.", "Connection is coming.", "A lesson from an old flame."],
    money: ["Wealth flows to you.", "Small investments grow.", "Pockets heavy with gold."],
    success: ["Work is being noticed.", "A door is opening.", "Breakthrough is days away."],
    career: ["Professional rewards arrive.", "Promotion is coming.", "Trust your intuition."]
  };

  const gen = (t) => {
    const r = (m, c) => {
      let s = new Set();
      while(s.size < c) s.add(Math.floor(Math.random() * m) + 1);
      return Array.from(s).sort((a, b) => a - b).join(", ");
    };

    if (t === 'powerball') return `White: ${r(69, 5)} | Red: ${Math.floor(Math.random() * 26) + 1}`;
    if (t === 'lotto') return `Lotto: ${r(59, 6)}`;
    if (t === 'pick3') return `P3: ${Math.floor(Math.random()*10)}-${Math.floor(Math.random()*10)}-${Math.floor(Math.random()*10)}`;
    if (t === 'pick4') return `P4: ${Math.floor(Math.random()*10)}-${Math.floor(Math.random()*10)}-${Math.floor(Math.random()*10)}-${Math.floor(Math.random()*10)}`;
    
    return `Cash: ${r(39, 5)}`;
  };

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("success") === "true") setN(gen(p.get("type")));
  }, []);

  const buy = (t) => {
    const urls = {
      'powerball': 'https://buy.stripe.com/28EaEX3Fo78Ch2V1cr4Vy02',
      'pick3': 'https://buy.stripe.com/PASTE_YOUR_PICK3_LINK_HERE',
      'pick4': 'https://buy.stripe.com/PASTE_YOUR_PICK4_LINK_HERE',
      'lotto': 'https://buy.stripe.com/28EaEX3Fo78Ch2V1cr4Vy02',
      'show-me-cash': 'https://buy.stripe.com/28EaEX3Fo78Ch2V1cr4Vy02'
    };
    if (urls[t]) window.location.href = urls[t];
  };

  return (
    <div style={{ minHeight: '100vh', background: '#05050a', color: 'white', textAlign: 'center', padding: '20px', fontFamily: 'serif' }}>
      <h1 style={{ color: '#ffb6c1', textShadow: '0 0 15px #ff69b4' }}>"Greetings, I am Sunny Daze."</h1>
      
      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px', maxWidth: '400px', margin: '20px auto', border: '1px dashed #4facfe' }}>
        <p style={{ color: '#00f2fe', margin: '5px 0' }}>🔮 <strong>Seek Wisdom:</strong> Tap a category for a free daily fortune.</p>
        <p style={{ color: '#ff69b4', margin: '5px 0' }}>🍀 <strong>Seek Fortune:</strong> Select a game for $0.99 lucky predictions.</p>
      </div>

      <div style={{ width: '250px', height: '250px', borderRadius: '50%', margin: '20px auto', background: 'radial-gradient(circle, #2a0845, #000000)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #4facfe', boxShadow: '0 0 30px #4facfe' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', padding: '20px' }}>{n || f || "Touch the ball..."}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {Object.keys(fortunes).map(c => (
          <button key={c} onClick={() => { setN(""); setF(fortunes[c][Math.floor(Math.random()*fortunes[c].length)]) }} style={{ margin: '5px', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', background: '#4facfe', color: 'black', border: 'none', fontWeight: 'bold' }}>
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
        <button onClick={() => buy('powerball')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4b2b' }}>
          <span style={{ fontSize: '2rem' }}>💎</span><br/>Powerball
        </button>
        <button onClick={() => buy('lotto')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4facfe' }}>
          <span style={{ fontSize: '2rem' }}>💰</span><br/>Lotto
        </button>
        <button onClick={() => buy('pick3')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00f2fe' }}>
          <span style={{ fontSize: '2rem' }}>✨</span><br/>Pick 3
        </button>
        <button onClick={() => buy('pick4')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a18cd1' }}>
          <span style={{ fontSize: '2rem' }}>🔮</span><br/>Pick 4
        </button>
      </div>
    </div>
  );
}

