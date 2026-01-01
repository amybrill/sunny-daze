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
      'powerball': 'https://buy.stripe.com/abc123yourlink',
      'lotto': 'https://buy.stripe.com/abc123yourlink',
      'show-me-cash': 'https://buy.stripe.com/abc123yourlink',
      'pick3': 'https://buy.stripe.com/abc123yourlink',
      'pick4': 'https://buy.stripe.com/abc123yourlink'
    };
    if(urls[t]) window.location.href = urls[t];

  };
   return (  <div style={{ minHeight: '100vh', background: '#05050a', color: 'white', textAlign: 'center', padding: '20px', fontFamily: 'serif' }}>
      <h1 style={{ color: '#ffb6c1', textShadow: '0 0 15px #ff69b4' }}>"Greetings, I am Sunny Daze."</h1>
<div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px', maxWidth: '400px', margin: '20px auto', border: '1px dashed #4facfe' }}>
  <p style={{ color: '#00f2fe', margin: '5px 0' }}>🔮 <strong>Seek Wisdom:</strong> Tap a category for a free daily fortune.</p>
  <p style={{ color: '#ff69b4', margin: '5px 0' }}>🍀 <strong>Seek Fortune:</strong> Select a game for $0.99 lucky predictions.</p>
</div>
      <div style={{ width: '250px', height: '250px', borderRadius: '50%', margin: '20px auto', background: 'radial-gradient(circle at 30% 30%, #4facfe 0%, #00f2fe 30%, #483d8b 70%, #1a1a2e 100%)', border: '8px solid #4b0082', boxShadow: '0 0 40px #4facfe, inset 0 0 30px #ff4500', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{n || f || "Touch the ball..."}</p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        {Object.keys(fortunes).map(c => <button key={c} onClick={() => setF(fortunes[c][Math.floor(Math.random()*fortunes[c].length)])} style={{ margin: '5px', padding: '8px', borderRadius: '15px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', borderBottom: '2px solid #ff69b4' }}>{c.toUpperCase()}</button>)}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
        <button onClick={() => buy('powerball')} style={{color:'red', background:'none', border:'none', fontSize:'2.5rem', cursor:'pointer'}}>∞<br/><span style={{fontSize:'0.7rem', color:'white'}}>Powerball</span></button>
        <button onClick={() => buy('lotto')} style={{color:'blue', background:'none', border:'none', fontSize:'2.5rem', cursor:'pointer'}}>∞<br/><span style={{fontSize:'0.7rem', color:'white'}}>Lotto</span></button>
        <button onClick={() => buy('show-me-cash')} style={{color:'gold', background:'none', border:'none', fontSize:'2.5rem', cursor:'pointer'}}>∞<br/><span style={{fontSize:'0.7rem', color:'white'}}>Cash</span></button>
        <button onClick={() => buy('pick3')} style={{color:'green', background:'none', border:'none', fontSize:'2.5rem', cursor:'pointer'}}>∞<br/><span style={{fontSize:'0.7rem', color:'white'}}>Pick 3</span></button>
        <button onClick={() => buy('pick4')} style={{color:'purple', background:'none', border:'none', fontSize:'2.5rem', cursor:'pointer'}}>∞<br/><span style={{fontSize:'0.7rem', color:'white'}}>Pick 4</span></button>
      </div>
<div style={{ marginTop: '20px' }}>
  <a href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonBookmark"></a>
  
</div>
    </div>
  );
};



