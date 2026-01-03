import React, { useState } from "react";

const Index = () => {
  const [prediction, setPrediction] = useState("");

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
          type: t 
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Server error:", data);
      }
    } catch (err) {
      console.error("Connection error:", err);
      alert("Could not connect to payment server.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#05050a', color: 'white', textAlign: 'center', padding: '20px' }}>
      <h1>Sunny Daze Predictions</h1>
      
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ff69b4', borderRadius: '15px', display: 'inline-block' }}>
        <h3 style={{ color: '#00f2fe' }}>Unlock Your Lucky Numbers</h3>
        <input id="nameInput" type="text" placeholder="Your Full Name" style={{ padding: '10px', margin: '5px', borderRadius: '5px', width: '80%', color: 'black' }} />
        <br />
        <input id="dobInput" type="date" style={{ padding: '10px', margin: '5px', borderRadius: '5px', width: '80%', color: 'black' }} />
        
        <div style={{ marginTop: '15px' }}>
          <button onClick={() => buy('powerball')} style={{ background: '#ff69b4', margin: '5px', padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '5px', color: 'white' }}>
            Powerball ($0.99)
          </button>
          <button onClick={() => buy('lotto')} style={{ background: '#ff69b4', margin: '5px', padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '5px', color: 'white' }}>
            Lotto ($0.99)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
