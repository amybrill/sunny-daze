import { useState, useEffect } from "react";

export default function Index() {
  const [fortune, setFortune] = useState("");
  const [luckyNumbers, setLuckyNumbers] = useState<number[] | null>(null);

  // WATCH FOR THE RETURN FROM STRIPE
 useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      const type = urlParams.get('type'); 
      
      let count = 5;
      let max = 69;

      if (type === 'pick3') {
        count = 3;
        max = 9;
      } else if (type === 'pick4') {
        count = 4;
        max = 9;} // This closes the pick4 rule

      // This part actually creates the random numbers!
      const numbers = Array.from({ length: count }, () => 
        Math.floor(Math.random() * (max + 1))
      );

      setLuckyNumbers(numbers);
      setFortune("The Universe has spoken! Your personal lucky numbers are revealed below.");
    }
  }, []); // This closes the whole watch-for-stripe section
      

  const fortunes = {
    love: ["A soulmate is closer than you think.", "Open your heart to the unexpected.", "A past flame may flicker again."],
    money: ["Wealth flows to you in expected and unexpected ways.", "A smart investment will soon pay off.", "Abundance is your birthright."],
    success: ["Your hard work is about to be recognized.", "A door you thought was closed is swinging open.", "Victory is within your grasp."],
    career: ["A promotion or new offer is on the horizon.", "Your unique talents are your greatest asset.", "Leadership suits you well."]
  };

  const getFortune = (category: keyof typeof fortunes) => {
    const options = fortunes[category];
    setFortune(options[Math.floor(Math.random() * options.length)]);
    setLuckyNumbers(null); // Clear numbers when picking a new fortune
  };

  const handleLotteryClick = async (type: string) => {
    try {
      const res = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }), // This tells the server WHICH game it is
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
          width: '220px', height: '220px', margin: '0 auto', borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #5d8aa8, #000033, #ff4500)',
          boxShadow: '0 0 50px #4b0082, inset 0 0 30px #ffffff44',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <p style={{ fontSize: '1rem', fontStyle: 'italic', textShadow: '0 0 10px #fff' }}>
            {fortune || "Select a path below..."}
          </p>
          
          {/* DISPLAY LUCKY NUMBERS INSIDE BALL */}
          {luckyNumbers && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              {luckyNumbers.map((n, i) => (
                <span key={i} style={{ color: '#00ffff', fontWeight: 'bold', fontSize: '1.2rem', textShadow: '0 0 5px #00ffff' }}>{n}</span>
              ))}
            </div>
          )}
        </div>
        <div style={{ width: '120px', height: '40px', background: '#4b0082', margin: '-15px auto 0', borderRadius: '50% 50% 10px 10px', boxShadow: '0 10px 20px #000' }}></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
        {['love', 'money', 'success', 'career'].map((cat) => (
          <button key={cat} onClick={() => getFortune(cat as any)} style={{ padding: '8px 12px', borderRadius: '20px', border: '1px solid #ffb6c1', background: 'transparent', color: '#ffb6c1', cursor: 'pointer', fontSize: '0.9rem' }}>
            {cat}
          </button>
        ))}
      </div>

      <hr style={{ borderColor: '#333', margin: '30px 0' }} />

      <p style={{ color: '#ffd700', fontSize: '1.1rem' }}>For $0.99 Sunny will reveal your personal lucky numbers</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginTop: '15px' }}>
        {[
          { name: 'Power Ball', color: 'red' },
          { name: 'Lotto', color: 'blue' },
          { name: 'Show me Cash', color: '#ffd700' },
          { name: 'Pick 3', color: 'green' },
          { name: 'Pick 4', color: 'purple' }
        ].map((btn) => (
          <button
            key={btn.name}
            onClick={() => handleLotteryClick(btn.name.toLowerCase().replace(/ /g, ''))}
            style={{
              width: '90px', height: '60px', borderRadius: '50px', border: `2px solid ${btn.color}`,
              background: 'transparent', color: btn.color, fontWeight: 'bold', cursor: 'pointer',
              fontSize: '0.75rem'
            }}>
            <span style={{ display: 'block', fontSize: '1.2rem' }}>∞</span>
            {btn.name}
          </button>
        ))}
      </div>
    </div>
  );
}
