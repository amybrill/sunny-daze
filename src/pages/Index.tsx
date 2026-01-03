import React, { useState } from "react";

const Index = () => {
  const [fortune, setFortune] = useState("Let Sunny talk to the universe, push her button to see your fate.");

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

  const getFortune = (type) => {
    const fortunes = {
      love: ["A soul bond is tightening.", "New sparks in old places.", "Open your heart tonight."],
      money: ["Gold flows where energy goes.", "A small risk leads to a big win.", "Wealth is seeking you."],
      success: ["Your hard work is peaking.", "The door you knocked on is open.", "Victory is a choice."]
    };
    const random = Math.floor(Math.random() * 3);
    setFortune(fortunes[type][random]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000814', color: 'white', textAlign: 'center', padding: '40px 10px', fontFamily: '"Cinzel", serif' }}>
      <h1 style={{ color: '#d4af37', letterSpacing: '8px', marginBottom: '30px', fontWeight: '300' }}>SUNNY DAZE</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* CRYSTAL BALL SIDE ATTRACTION */}
        <div style={{ width: '220px', marginTop: '20px' }}>
          <div style={{ 
            width: '180px', height: '180px', borderRadius: '50%', margin: '0 auto',
            background: 'radial-gradient(circle, #fff 0%, #e0e0e0 60%, #b0b0b0 100%)',
            boxShadow: '0 0 30px rgba(255,255,255,0.5)', border: '2px solid #ccc',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px', position: 'relative', zIndex: '2'
          }}>
            <p style={{ color: 'black', fontFamily: 'cursive', fontSize: '0.8rem', fontWeight: 'bold' }}>{fortune}</p>
          </div>
          {/* PURPLE BASE WITH PUSH BUTTONS */}
          <div style={{ 
            background: '#4b0082', height: '80px', width: '200px', margin: '-20px auto 0', 
            borderRadius: '10px 10px 50% 50%', border: '3px solid #d4af37', position: 'relative', zIndex: '1',
            display: 'flex', justifyContent: 'center', gap: '10px', paddingTop: '25px'
          }}>
            {['love', 'money', 'success'].map((item) => (
              <button key={item} onClick={() => getFortune(item)} style={{ 
                background: '#d4af37', border: 'none', borderRadius: '50%', width: '35px', height: '35px', 
                cursor: 'pointer', padding: '3px', borderBottom: '3px solid #8c6d1a'
              }}>
                <div style={{ background: 'red', width: '100%', height: '100%', borderRadius: '50%', border: '1px solid black' }}></div>
              </button>
            ))}
          </div>
          <p style={{ color: '#d4af37', fontSize: '0.7rem', marginTop: '10px', fontWeight: 'bold' }}>FREE DAILY FORTUNES</p>
        </div>

        {/* MAIN NEON GRID */}
        <div style={{ 
          padding: '30px 20px', border: '4px solid #ff69b4', borderRadius: '20px', 
          width: '100%', maxWidth: '450px', background: 'rgba(255,255,255,0.05)', 
          boxShadow: '0 0 40px #ff69b4', backdropFilter: 'blur(10px)' 
        }}>
          <h3 style={{ color: '#ff69b4', textShadow: '0 0 10px #ff69b4', fontWeight: '900' }}>UNLOCK YOUR DESTINY</h3>
          
          <input id="nameInput" type="text" placeholder="FULL NAME" style={{ padding: '12px', margin: '10px 0', width: '85%', background: '#000', color: 'white', border: '1px solid #ff69b4' }} />
          <input id="dobInput" type="date" style={{ padding: '12px', margin: '10px 0', width: '85%', background: '#000', color: 'white', border: '1px solid #ff69b4' }} />
          
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', margin: '20px 0', borderRadius: '5px' }}>
            <p style={{ fontSize: '0.75rem', color: '#d4af37', fontWeight: 'bold' }}>Full Soul Contract + 12-Month Numerology Forecast + Lucky Alignment Numbers</p>
            <button onClick={() => buy('premium')} style={{ 
              background: 'linear-gradient(45deg, #d4af37, #f1d592)', color: 'white', padding: '15px', 
              fontWeight: '900', width: '100%', border: 'none', cursor: 'pointer', fontSize: '1rem' 
            }}>
              REVEAL SOUL & NUMEROLOGY ($4.44)
            </button>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#ff69b4', fontWeight: 'bold' }}>— OR CHOOSE YOUR DESTINY ONE NUMBER AT A TIME —</p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => buy('powerball')} style={{ background: 'white', color: '#000814', padding: '12px', fontWeight: '900', flex: 1, border: 'none' }}>
              POWERBALL ($0.99)
            </button>
            <button onClick={() => buy('lotto')} style={{ background: 'white', color: '#000814', padding: '12px', fontWeight: '900', flex: 1, border: 'none' }}>
              LOTTO ($0.99)
            </button>
          </div>

          <p style={{ fontSize: '0.6rem', color: '#666', marginTop: '20px' }}>DISCLAIMER: For entertainment only. 18+.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
