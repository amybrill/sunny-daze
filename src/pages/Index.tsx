import { useState, useEffect } from "react";

export default function Index() {
  const [fortune, setFortune] = useState("");
  const [luckyNumbers, setLuckyNumbers] = useState("");
  const fortunes = {
    love: ["New sparks ignite soon.", "Open your heart to connection.", "A lesson comes from an old flame."],
    money: ["Wealth flows your way.", "Small investments grow today.", "Your pockets will be heavy with gold."],
    success: ["Your work is being noticed.", "The door is swinging open.", "A breakthrough is days away."],
    career: ["Professional rewards arrive.", "Talent leads to promotion.", "Trust your business intuition."]
  };
  const generateNumbers = (type) => {
    const r = (m, c) => {
      let s = new Set();
      while(s.size < c) s.add(Math.floor(Math.random() * m) + 1);
      return Array.from(s).sort((a, b) => a - b).join(", ");
    };
    if (type === 'powerball') return `PB: ${r(69, 5)} | ${Math.floor(Math.random() * 26) + 1}`;
    if (type === 'lotto') return `Lotto: ${r(59, 6)}`;
    if (type === 'pick3') return `P3: ${Math.floor(Math.random()*10)}-${Math.floor(Math.random()*10)}-${Math.floor(Math.random()*10)}`;
    if (type === 'pick4') return `P4: ${Math.floor(Math.random()*10)}-${Math.floor(Math.random()*10)}-${Math.floor(Math.random()*10)}-${Math.floor(Math.random()*10)}`;
    return `Cash: ${r(39, 5)}`;
  };
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("success") === "true") setLuckyNumbers(generateNumbers(p.get("type")));
  }, []);
  const buy = async (t) => {
    const res = await fetch('/create-checkout-session', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({type: t}) });
    const d = await res.json();
    if (d.url) window.location.href = d.url;
  };
  return (
    <div style={{ minHeight: '100vh', background: '#05050a', color: 'white', textAlign: 'center', padding: '20px' }}>
      <h1>"Greetings, I am Sunny Daze."</h1>
      <div style={{ width: '250px', height: '250px', borderRadius: '50%', margin: '20px auto', background: 'radial-gradient(circle, #4facfe, #483d8b)', border: '10px solid #4b0082', boxShadow: '0 0 50px #4facfe', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <p>{luckyNumbers || fortune || "Touch a button..."}</p>
      </div>
      <div>
        {['love','money','success','career'].map(c => <button key={c} onClick={() => setFortune(fortunes[c][Math.floor(Math.random()*fortunes[c].length)])} style={{margin:'5px', padding:'10px', borderRadius:'20px'}}>{c}</button>)}
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => buy('powerball')} style={{color:'red', fontSize:'2rem', background:'none', border:'none'}}>∞ Power</button>
        <button onClick={() => buy('lotto')} style={{color:'blue', fontSize:'2rem', background:'none', border:'none'}}>∞ Lotto</button>
        <button onClick={() => buy('pick3')} style={{color:'green', fontSize:'2rem', background:'none', border:'none'}}>∞ Pick3</button>
      </div>
    </div>
  );
}
