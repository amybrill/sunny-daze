import React from "react";

const Index = () => {
  const buy = async (t) => {
    const userName = document.getElementById('nameInput')?.value || "Friend";
    const userDob = document.getElementById('dobInput')?.value || "Unknown";
    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, dob: userDob, type: t }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      alert("Connection error. Please try again.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000814', color: 'white', textAlign: 'center', padding: '50px 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#d4af37', letterSpacing: '8px', marginBottom: '40px', fontWeight: '300' }}>SUNNY DAZE</h1>
      
      {/* THE FLOATING NEON GRID */}
      <div style={{ 
        marginTop: '30px', 
        padding: '40px 20px', 
        border: '4px solid #ff69b4', 
        borderRadius: '20px', 
        display: 'inline-block',
        width: '100%',
        maxWidth: '500px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(200,200,200,0.1) 100%)', 
        boxShadow: '0 0 40px #ff69b4, inset 0 0 20px rgba(255, 105, 180, 0.3)', 
        backdropFilter: 'blur(10px)',
        position: 'relative'
      }}>
        
        <h3 style={{ color: '#00f2fe', letterSpacing: '2px', marginBottom: '25px', fontWeight: 'bold' }}>UNLOCK YOUR DESTINY</h3>
        
        <p style={{ fontSize: '0.85rem', color: '#eee', marginBottom: '20px', lineHeight: '1.5', fontWeight: 'bold' }}>
          ENTER YOUR NAME AND BIRTH DATE.<br/> 
          THESE VIBRATIONS ALIGN YOUR NUMBERS.
        </p>

        <input id="nameInput" type="text" placeholder="FULL NAME" style={{ padding: '15px', margin: '10px', borderRadius: '0px', width: '80%', background: 'rgba(0,0,0,0.6)', color: 'white', border: '1px solid #ff69b4', fontWeight: 'bold' }} />
        <br />
        <input id="dobInput" type="date" style={{ padding: '15px', margin: '10px', borderRadius: '0px', width: '80%', background: 'rgba(0,0,0,0.6)', color: 'white', border: '1px solid #ff69b4', fontWeight: 'bold' }} />
        
        {/* PREMIUM BUTTON - GOLD BOX LETTERS */}
        <div style={{ marginTop: '30px' }}>
          <button onClick={() => buy('premium')} style={{ 
            background: 'linear-gradient(45deg, #d4af37, #f1d592)', 
            color: 'white', 
            padding: '20px', 
            fontWeight: '900', 
            borderRadius: '0px', 
            border: 'none', 
            cursor: 'pointer', 
            width: '90%', 
            fontSize: '1.1rem',
            textTransform: 'uppercase',
            boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
          }}>
            REVEAL SOUL & NUMEROLOGY ($4.44)
          </button>
        </div>

        {/* STANDARD BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
          <button onClick={() => buy('powerball')} style={{ background: 'transparent', color: 'white', padding: '12px', fontWeight: '900', border: '2px solid #ff69b4', flex: 1, textTransform: 'uppercase' }}>
            Powerball
          </button>
          <button onClick={() => buy('lotto')} style={{ background: 'transparent', color: 'white', padding: '12px', fontWeight: '900', border: '2px solid #ff69b4', flex: 1, textTransform: 'uppercase' }}>
            Lotto
          </button>
        </div>

        {/* DISCLAIMER */}
        <p style={{ fontSize: '0.65rem', color: '#999', marginTop: '30px', padding: '0 20px', fontStyle: 'italic' }}>
          DISCLAIMER: For entertainment purposes only. Results are based on numerological interpretations and do not guarantee financial gain. Must be 18+.
        </p>
      </div>
    </div>
  );
};

export default Index;
