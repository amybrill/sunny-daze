import React, { useState } from "react";

const Index = () => {
  const buy = async (t) => {
    const userName = document.getElementById('nameInput')?.value || "Friend";
    const userDob = document.getElementById('dobInput')?.value || "Unknown";
    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName,
          dob: userDob,
          type: t  // This tells the server which price to use!
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Connection error:", err);
      alert("Could not connect to payment server.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000814', color: 'white', textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#d4af37', letterSpacing: '3px' }}>SUNNY DAZE</h1>
      
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ff69b4', borderRadius: '15px', display: 'inline-block', background: 'rgba(255,255,255,0.05)' }}>
        <h3 style={{ color: '#00f2fe' }}>Unlock Your Destiny</h3>
        
        <input id="nameInput" type="text" placeholder="Your Full Name" style={{ padding: '10px', margin: '5px', borderRadius: '5px', width: '80%' }} />
        <br />
        <input id="dobInput" type="date" style={{ padding: '10px', margin: '5px', borderRadius: '5px', width: '80%' }} />
        
        {/* PREMIUM BUTTON */}
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => buy('premium')} style={{ background: 'linear-gradient(45deg, #d4af37, #f1d592)', color: '#000', padding: '15px', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '85%', fontSize: '1rem' }}>
            REVEAL SOUL & NUMEROLOGY ($4.44)
          </button>
          <p style={{ fontSize: '0.7rem', color: '#888', margin: '10px 0' }}>— OR —</p>
        </div>

        {/* STANDARD BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={() => buy('powerball')} style={{ background: 'transparent', color: '#ff69b4', padding: '10px', cursor: 'pointer', border: '1px solid #ff69b4', borderRadius: '5px' }}>
            Powerball ($0.99)
          </button>
          <button onClick={() => buy('lotto')} style={{ background: 'transparent', color: '#ff69b4', padding: '10px', cursor: 'pointer', border: '1px solid #ff69b4', borderRadius: '5px' }}>
            Lotto ($0.99)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
