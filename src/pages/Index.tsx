import React, { useState } from 'react';

const fortunes = {
  Love: "The flames of passion are rising. Someone from your past is drawing near.",
  Success: "I see golden sparks. Your ambition is fueling a major breakthrough soon.",
  Relationship: "The mist clears to show harmony. A deep conversation will heal an old wound.",
  Career: "A powerful fire burns in your professional sector. A new path is inevitable."
};

const games = [
  { n: "Powerball", c: "#ff0000" }, { n: "Mega Millions", c: "#ffd700" },
  { n: "Show Me Cash", c: "#00ff00" }, { n: "Cash 4 Life", c: "#40e0d0" },
  { n: "Lotto", c: "#c0c0c0" }, { n: "Pick 4", c: "#ffff00", s: "black" }, { n: "Pick 3", c: "#ff0000", s: "blue" }
];

export default function Index() {
  const [f, setF] = useState("");
  const buy = async (gn) => {
    const res = await fetch('https://sunny-daze-production.up.railway.app/create-checkout-session', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ game: gn }),
    });
    const d = await res.json(); window.location.href = d.url;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#05050a', color: 'white', textAlign: 'center', padding: '20px', fontFamily: 'serif' }}>
      <h1 style={{ color: '#ffb6c1', textShadow: '0 0 15px #ff69b4' }}>"Greetings, I am Sunny Daze."</h1>
      
      <div style={{ position: 'relative', width: '250px', height: '250px', margin: '20px auto 40px' }}>
        <div style={{ position: 'absolute', inset: '-30px', background: 'radial-gradient(circle, rgba(255,182,193,0.3) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(20px)' }}></div>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #94a3b8, #475569 60%, #1e1b4b 100%)', boxShadow: '0 0 40px rgba(173, 216, 230, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', border: '2px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 2, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: '0', width: '100%', height: '40%', background: 'linear-gradient(to top, rgba(255,69,0,0.3), transparent)', filter: 'blur(8px)' }}></div>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', textShadow: '0 0 10px #ffb6c1' }}>{f || "Touch a category below..."}</p>
        </div>
        <div style={{ width: '140px', height: '35px', background: 'linear-gradient(to bottom, #7e22ce, #3b0764)', margin: '-10px auto 0', borderRadius: '50%', position: 'relative', zIndex: 1 }}></div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '50px' }}>
        {Object.keys(fortunes).map(cat => (
          <button key={cat} onClick={() => setF(fortunes[cat])} style={{ background: 'none', color: '#ffb6c1', border: '1px solid #ffb6c1', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer' }}>{cat}</button>
        ))}
      </div>

      <h2 style={{ color: '#add8e6', textShadow: '0 0 10px blue' }}>Personalized Lottery Magic</h2>
      <p style={{ marginBottom: '30px', opacity: 0.7 }}>"For 99¢, I will channel the flames."</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '400px', margin: '0 auto' }}>
        {games.map(g => (
          <div key={g.n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button onClick={() => buy(g.n)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <svg width="80" height="40" viewBox="0 0 100 50" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>
                <path d="M30,15 C15,15 15,35 30,35 C40,35 48,28 50,25 C52,22 60,15 70,15 C85,15 85,35 70,35 C60,35 52,28 50,25 C48,22 40,15 30,15 Z" 
                      fill={g.c} stroke={g.s || "white"} strokeWidth="3" />
                <text x="50" y="30" fontSize="9" textAnchor="middle" fill="white" fontWeight="bold">PAY</text>
              </svg>
            </button>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', marginTop: '5px' }}>{g.n}</span>
          </div>
        ))}
      </div>
      <footer style={{ marginTop: '50px', opacity: 0.2, fontSize: '0.7rem' }}>© Sunny Daze</footer>
    </div>
  );
}
