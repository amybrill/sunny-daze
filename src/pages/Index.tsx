import { useState } from "react";

export default function Index() {
  const [fortune, setFortune] = useState("");
  const [luckyNumbers, setLuckyNumbers] = useState<number[] | null>(null);

  const fortunes = {
    love: ["A soulmate is closer than you think.", "Open your heart to the unexpected.", "A past flame may flicker again."],
    money: ["Wealth flows to you in expected and unexpected ways.", "A smart investment will soon pay off.", "Abundance is your birthright."],
    success: ["Your hard work is about to be recognized.", "A door you thought was closed is swinging open.", "Victory is within your grasp."],
    career: ["A promotion or new offer is on the horizon.", "Your unique talents are your greatest asset.", "Leadership suits you well."]
  };

  const getFortune = (category: keyof typeof fortunes) => {
    const options = fortunes[category];
    setFortune(options[Math.floor(Math.random() * options.length)]);
  };

  const handleLotteryClick = async () => {
    // Redirect to Stripe Payment Page
    try {
      const res = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Payment error", err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a15', color: 'white', textAlign: 'center', padding: '20px', fontFamily: 'serif' }}>
      
      {/* CRYSTAL BALL SECTION */}
      <div style={{ margin: '20px auto', width: '280px' }}>
        <div style={{ 
          width: '200px', height: '200px', margin: '0 auto', borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #5d8aa8, #000033, #ff4500)',
          boxShadow: '0 0 40px #4b0082, inset 0 0 20px #ffffff55',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', textShadow: '0 0 10px #fff' }}>
            {fortune || "Select a path below..."}
          </p>
        </div>
        {/* PURPLE BASE */}
        <div style={{ width: '120px', height: '40px', background: '#4b0082', margin: '-10px auto 0', borderRadius: '50% 50% 10px 10px', boxShadow: '0 5px 15px #000' }}></div>
      </div>

      {/* 4 FORTUNE BUTTONS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
        {['love', 'money', 'success', 'career'].map((cat) => (
          <button key={cat} onClick={() => getFortune(cat as any)} style={{ padding: '10px 15px', borderRadius: '20px', border: '1px solid #ffb6c1', background: 'transparent', color: '#ffb6c1', cursor: 'pointer', textTransform: 'capitalize' }}>
            {cat}
          </button>
        ))}
      </div>

      <hr style={{ borderColor: '#333', margin: '40px 0' }} />

      {/* LOTTERY SECTION */}
      <p style={{ color: '#ffd700', fontSize: '1.2rem' }}>For $0.99 Sunny will speak to the universe for your lucky numbers</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        {[
          { name: 'Power Ball', color: 'red' },
          { name: 'Lotto', color: 'blue' },
          { name: 'Show me Cash', color: '#ffd700' },
          { name: 'Pick 3', color: 'green' },
          { name: 'Pick 4', color: 'purple' }
        ].map((btn) => (
          <button 
            key={btn.name} 
            onClick={handleLotteryClick}
            style={{ 
              width: '100px', height: '50px', borderRadius: '50px', border: `3px solid ${btn.color}`, 
              background: 'transparent', color: btn.color, fontWeight: 'bold', cursor: 'pointer',
              fontSize: '0.8rem', position: 'relative'
            }}>
            {/* Simple Infinity Shape Simulation */}
            <span style={{ display: 'block' }}>∞</span>
            {btn.name}
          </button>
        ))}
      </div>
    </div>
  );
}
