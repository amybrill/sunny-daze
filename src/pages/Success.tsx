import React, { useEffect, useState } from 'react';

const Success = () => {
  const [numbers, setNumbers] = useState([0, 0, 0, 0, 0, 0]);
  const [soulNum, setSoulNum] = useState("?");

  useEffect(() => {
    const timer = setTimeout(() => {
      setNumbers([8, 14, 22, 31, 44, 52]); 
      setSoulNum("9");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#000814', 
      color: 'white', 
      textAlign: 'center', 
      padding: '40px 20px', 
      fontFamily: 'serif' 
    }}>
      <h1 style={{ color: '#d4af37', fontSize: '1.8rem', letterSpacing: '6px', marginBottom: '60px' }}>
        DIVINE RESULTS
      </h1>

      <div style={{ marginBottom: '60px' }}>
        <div style={{
          width: '150px', height: '150px', border: '3px solid #ff69b4', borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
          boxShadow: '0 0 40px #ff69b4, inset 0 0 20px #ff69b4',
          background: 'radial-gradient(circle, rgba(255,105,180,0.1) 0%, transparent 80%)'
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.7rem', color: '#ff69b4', letterSpacing: '3px' }}>SOUL</p>
            <span style={{ fontSize: '4.5rem', color: '#ff69b4', fontWeight: 'bold', textShadow: '0 0 15px #ff69b4' }}>
              {soulNum}
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '450px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {numbers.map((n, i) => (
          <div key={i} style={{
            border: '1px solid #d4af37', 
            padding: '25px 0',
            borderRadius: '4px',
            background: 'linear-gradient(145deg, #00122e, #000814)', 
            color: '#d4af37',
            fontSize: '2rem', 
            fontWeight: '300',
            boxShadow: '0 10px 20px rgba(0,0,0,0.6), 0 0 8px rgba(212,175,55,0.2)'
          }}>
            {n}
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '80px', color: '#d4af37', fontSize: '0.6rem', letterSpacing: '4px', opacity: '0.6' }}>
        SUNNY DAZE • PRIVATE SELECTION
      </footer>
    </div>
  );
};

export default Success;
