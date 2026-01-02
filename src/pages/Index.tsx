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
    if (p.get("success") === "true") {
const type = p.get("type") || 'powerball';
      buy(type);
} // this closes the 'if'
}, []); // This closes the 'useEffect'

  const buy = async (t) => {
  // 1. Get the values the user typed in (make sure these IDs match your input fields)
  const userName = document.getElementById('nameInput')?.value || "Friend";
  const userDob = document.getElementById('dobInput')?.value || "Unknown";

  try {
    // 2. Talk to YOUR server instead of going straight to Stripe
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName,
        dob: userDob,
        type: t // 'powerball', 'pick3', etc.
      }),
    });

    const data = await response.json();

    // 3. Send the user to the checkout page created by your server
    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("Server didn't return a URL", data);
    }
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Something went wrong with the connection.");
  }
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
<div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ff69b4', borderRadius: '15px' }}>
  <h3 style={{ color: '#00f2fe' }}>Unlock Your Lucky Numbers</h3>
  
  <input 
    id="nameInput" 
    type="text" 
    placeholder="Your Full Name" 
    style={{ padding: '10px', margin: '5px', borderRadius: '5px', width: '80%' }} 
  />
  <br />
  <input 
    id="dobInput" 
    type="date" 
    style={{ padding: '10px', margin: '5px', borderRadius: '5px', width: '80%' }} 
  />
  
  <div style={{ marginTop: '15px' }}>
    <button onClick={() => buy('powerball')} style={{ background: '#ff69b4', margin: '5px' }}>
      Powerball ($0.99)
    </button>
    <button onClick={() => buy('lotto')} style={{ background: '#ff69b4', margin: '5px' }}>
      Lotto ($0.99)
    </button>
  </div>
</div>
<footer style={{ marginTop: '40px', padding: '20px', fontSize: '0.8rem', opacity: '0.6', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p>
          Disclaimer: This site is for entertainment purposes only. 
          Predictions are generated at random and do not guarantee winnings. 
          Please play responsibly.
        </p>
      </footer>
</div>
    </div>
  );
};

export default Index;

