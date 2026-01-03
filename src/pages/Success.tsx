import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState(null);

  const name = searchParams.get("name") || "Seeker";
  const dob = searchParams.get("dob") || "";

  useEffect(() => {
    // 1. Calculate Life Path (Sum of DOB)
    const digits = dob.replace(/\D/g, "");
    let lp = digits.split("").reduce((a, b) => parseInt(a) + parseInt(b), 0);
    while (lp > 9 && lp !== 11 && lp !== 22) {
      lp = lp.toString().split("").reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }

    // 2. Calculate Soul Number (Vowels in Name)
    const vowelValues = { a: 1, e: 5, i: 9, o: 6, u: 3 };
    let sn = name.toLowerCase().split("").reduce((acc, char) => acc + (vowelValues[char] || 0), 0);
    while (sn > 9) {
      sn = sn.toString().split("").reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }

    const meanings = {
      lp: {
        1: "The Leader: Your path is to innovate and lead others.",
        2: "The Diplomat: You are here to bring balance and peace.",
        3: "The Creator: Your journey is one of joy and expression.",
        4: "The Builder: You provide the foundation and stability.",
        5: "The Explorer: Your life is a whirlwind of travel and change.",
        6: "The Nurturer: You are here to heal and protect.",
        7: "The Mystic: You are a seeker of truth and secrets.",
        8: "The Powerhouse: You are here to master the material world.",
        9: "The Humanitarian: You are finishing a long soul cycle.",
        11: "The Intuitive: You are a messenger of higher light.",
        22: "The Master Architect: You build dreams into reality."
      },
      sn: {
        1: "Your soul craves independence and being the best.",
        2: "Your heart seeks harmony, love, and partnership.",
        3: "You crave laughter, art, and an audience.",
        4: "You desire security, order, and a solid plan.",
        5: "You hunger for freedom and new experiences.",
        6: "You love beauty, home, and being needed.",
        7: "You need silence, wisdom, and deep study.",
        8: "You crave authority, success, and legacy.",
        9: "Your soul wants to heal the world."
      }
    };

    setResult({ lp: lp, sn: sn, lpText: meanings.lp[lp], snText: meanings.sn[sn] });
  }, [name, dob]);

  if (!result) return <div style={{background:'#000814', color:'white', height:'100vh', padding:'50px'}}>Reading the Stars...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#000814', color: 'white', textAlign: 'center', padding: '50px 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#d4af37', letterSpacing: '5px' }}>YOUR DESTINY REVEALED</h1>
      <div style={{ border: '2px solid #ff69b4', padding: '30px', borderRadius: '15px', maxWidth: '500px', margin: '0 auto', background: 'rgba(255,255,255,0.05)', boxShadow: '0 0 20px #ff69b4' }}>
        <h2 style={{ color: '#00f2fe' }}>{name}</h2>
        <hr style={{ borderColor: '#ff69b4' }} />
        <div style={{ margin: '20px 0' }}>
          <h3 style={{ color: '#d4af37' }}>Life Path Number: {result.lp}</h3>
          <p>{result.lpText}</p>
        </div>
        <div style={{ margin: '20px 0' }}>
          <h3 style={{ color: '#d4af37' }}>Soul Number: {result.sn}</h3>
          <p>{result.snText}</p>
        </div>
        <button onClick={() => window.print()} style={{ marginTop: '20px', padding: '10px 20px', background: '#ff69b4', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>SAVE YOUR DESTINY</button>
      </div>
    </div>
  );
};

export default Success;
