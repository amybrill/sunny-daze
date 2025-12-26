import { useState } from "react";

export default function Index() {
  const [f, setF] = useState("");
  const [lotto, setLotto] = useState<number[]>([]);

  const fortunes = [
    "A golden egg of opportunity will land in your lap.",
    "Your path is illuminated by the light of your own courage.",
    "A surprise gift is on its way to you.",
    "Good things come to those who hustle.",
    "The sun will shine on your endeavors tomorrow.",
    "A new friendship will bring great joy."
  ];

  const getNewFortune = () => {
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    const nums = Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1);
    setF(random);
    setLotto(nums);
  };

  const buy = async () => {
    try {
      const res = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Stripe error", err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a1a', color: 'white', textAlign: 'center', padding: '20px', fontFamily: 'serif' }}>
      <h1 style={{ color: '#ffb6c1', textShadow: '0 0 20px #ff69b4', fontSize: '2.5rem' }}>✨ Sunny Daze ✨</h1>
      
      <div 
        onClick={getNewFortune}
        style={{ 
          position: 'relative', width: '260px', height: '260px', margin: '40px auto', 
          borderRadius: '50%', cursor: 'pointer',
          background: 'radial-gradient(circle at 30% 30%, #a066ff, #4b0082 60%, #000 100%)',
          boxShadow: '0 0 50px #ff69b4',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
         <div style={{ padding: '20px', fontSize: '1.1rem', fontStyle: 'italic' }}>
            {f || "Touch the Orb"}
         </div>
      </div>

      {lotto.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {lotto.map((n, i) => (
              <span key={i} style={{ color: '#ff69b4', fontWeight: 'bold', fontSize: '1.2rem' }}>{n}</span>
            ))}
          </div>
        </div>
      )}

      <button onClick={buy} style={{ marginTop: '40px', background: 'linear-gradient(45deg, #ff69b4, #4b0082)', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '30px', cursor: 'pointer' }}>
        Unlock Premium Secrets ($1)
      </button>
    </div>
  );
}
