import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const gameStyles = {
  "Powerball": { col: "#ff0000", glow: "red" },
  "Mega Millions": { col: "#ffd700", glow: "gold" },
  "Show Me Cash": { col: "#00ff00", glow: "green" },
  "Cash 4 Life": { col: "#40e0d0", glow: "turquoise" },
  "Lotto": { col: "#c0c0c0", glow: "silver" },
  "Pick 4": { col: "#ffff00", glow: "yellow" },
  "Pick 3": { col: "#ff4d4d", glow: "blue" }
};

export default function Success() {
  const [searchParams] = useSearchParams();
  const game = searchParams.get('game') || "Powerball";
  const [numbers, setNumbers] = useState([]);
  const style = gameStyles[game] || gameStyles["Powerball"];

  useEffect(() => {
    const count = (game.includes('Pick 3')) ? 3 : (game.includes('Pick 4')) ? 4 : 5;
    const max = (game.includes('Powerball')) ? 69 : 40;
    const generated = Array.from({ length: count }, () => Math.floor(Math.random() * max) + 1);
    setNumbers(generated);
  }, [game]);
  return (
    <div style={{ minHeight: '100vh', background: '#05050a', color: 'white', textAlign: 'center', padding: '40px 20px', fontFamily: 'serif' }}>
      <h1 style={{ color: '#ffb6c1', textShadow: '0 0 20px #ff69b4' }}>Your Vision is Complete</h1>
      <p style={{ fontStyle: 'italic', color: '#cbd5e1' }}>"The flames have spoken for your {game} journey..."</p>

      <div style={{ position: 'relative', width: '300px', height: '300px', margin: '40px auto' }}>
        {/* Pink Mist surrounding the result */}
        <div style={{ position: 'absolute', inset: '-40px', background: 'radial-gradient(circle, rgba(255,182,193,0.3) 0%, transparent 75%)', borderRadius: '50%', filter: 'blur(25px)' }}></div>
        
        {/* The Reveal Crystal Ball */}
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #94a3b8, #475569 60%, #1e1b4b 100%)', boxShadow: `0 0 60px ${style.col}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.2)', position: 'relative', zIndex: 2, overflow: 'hidden' }}>
          
          {/* Internal Flames */}
          <div style={{ position: 'absolute', bottom: '0', width: '100%', height: '50%', background: `linear-gradient(to top, ${style.col}44, transparent)`, filter: 'blur(15px)', zIndex: -1 }}></div>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {numbers.map((num, i) => (
              <div key={i} style={{ width: '50px', height: '50px', borderRadius: '50%', background: style.col, color: (game === 'Pick 4' || game === 'Lotto') ? 'black' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', border: '2px solid white' }}>
                {num}
              </div>
            ))}
          </div>
        </div>
        
        {/* Purple Base */}
        <div style={{ width: '160px', height: '40px', background: 'linear-gradient(to bottom, #7e22ce, #3b0764)', margin: '-15px auto 0', borderRadius: '50%', position: 'relative', zIndex: 1 }}></div>
      </div>

      <Link to="/" style={{ color: '#ffb6c1', textDecoration: 'none', border: '1px solid #ffb6c1', padding: '10px 20px', borderRadius: '20px' }}>Return to Sunny</Link>
    </div>
  );
}
