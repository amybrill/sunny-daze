import { useState } from "react";

export default function Index() {
  const [f, setF] = useState("");

  const fortunes = [
    "A golden egg of opportunity will land in your lap.",
    "Your path is illuminated by the light of your own courage.",
    "A surprise gift is on its way to you.",
    "Good things come to those who hustle.",
    "The sun will shine on your endeavors tomorrow.",
    "A new friendship will bring great joy."
  ];

  const buy = async () => {
    try {
      const res = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe URL missing", data);
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  const getNewFortune = () => {
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setF(random);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#05050a', color: 'white', textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#ffb6c1', textShadow: '0 0 15px #ff69b4' }}>"Greetings, I am Sunny Daze."</h1>
      
      <div style={{ margin: '40px auto', padding: '20px', border: '1px solid #ffb6c1', borderRadius: '15px', maxWidth: '400px', minHeight: '100px' }}>
        <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>{f || "Click below to see your destiny..."}</p>
      </div>

      <button onClick={getNewFortune} style={{ background: '#ff69b4', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '10px' }}>
        Get New Fortune
      </button>

      <button onClick={buy} style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '10px' }}>
        Pay for Premium Fortune ($1)
      </button>
    </div>
  );
}
