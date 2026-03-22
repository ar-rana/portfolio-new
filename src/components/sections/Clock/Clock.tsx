import React, { useEffect, useRef } from "react";
import styles from "./clock.module.css";

const Clock: React.FC = () => {
  const hourRef = useRef<HTMLDivElement | null>(null);
  const minRef = useRef<HTMLDivElement | null>(null);
  const secRef = useRef<HTMLDivElement | null>(null);

  const displayTime = () => {
    let date = new Date();

    const istTime = date.toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const [hh, mm, ss] = istTime.split(':').map(num => parseInt(num));
    let hRotation = 15 * hh + mm / 4; // 360/24 + 15/60
    let mRotation = 6 * mm; // 360/60
    let sRotation = 6 * ss; // 360/60

    hourRef.current!.style.transform = `rotate(${hRotation}deg)`;
    minRef.current!.style.transform = `rotate(${mRotation}deg)`;
    secRef.current!.style.transform = `rotate(${sRotation}deg)`;
  };

  useEffect(() => {
    const interval = setInterval(displayTime, 1000);

    return(() => clearInterval(interval));
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.clock}>
        <div
          className={styles.hand}
          ref={hourRef}
          style={{ height: '64px', zIndex: '1' }}
        >
            <i style={{backgroundColor: 'red'}}></i>
        </div>
        <div
          className={styles.hand}
          ref={minRef}
          style={{ height: "84px" }}
        >
            <i style={{backgroundColor: 'white'}}></i>
        </div>
        <div
          className={styles.hand}
          ref={secRef}
          style={{height: "98px" }}
        >
            <i style={{backgroundColor: 'white'}}></i>
        </div>

        <span style={{"--i": 1} as React.CSSProperties}><b>|</b></span>
        <span style={{"--i": 2} as React.CSSProperties}><b>|</b></span>
        <span style={{"--i": 3} as React.CSSProperties}><b>|</b></span>
        <span style={{"--i": 4} as React.CSSProperties}><b>|</b></span>
        <span style={{"--i": 5} as React.CSSProperties}><b>|</b></span>
        <span style={{"--i": 6} as React.CSSProperties}><b>06</b></span>
        <span style={{"--i": 7} as React.CSSProperties}><b>|</b></span>
        <span style={{"--i": 8} as React.CSSProperties}><b>|</b></span>
        <span style={{"--i": 9} as React.CSSProperties}><b>|</b></span>
        <span style={{"--i": 10} as React.CSSProperties}><b>|</b></span>
        <span style={{"--i": 11} as React.CSSProperties}><b>|</b></span>
        <span style={{"--i": 12} as React.CSSProperties}><b>12</b></span>

        <span style={{ "--i": 13 } as React.CSSProperties}><b>|</b></span>
        <span style={{ "--i": 14 } as React.CSSProperties}><b>|</b></span>
        <span style={{ "--i": 15 } as React.CSSProperties}><b>|</b></span>
        <span style={{ "--i": 16 } as React.CSSProperties}><b>|</b></span>
        <span style={{ "--i": 17 } as React.CSSProperties}><b>|</b></span>
        <span style={{ "--i": 18 } as React.CSSProperties}><b>18</b></span>
        <span style={{ "--i": 19 } as React.CSSProperties}><b>|</b></span>
        <span style={{ "--i": 20 } as React.CSSProperties}><b>|</b></span>
        <span style={{ "--i": 21 } as React.CSSProperties}><b>|</b></span>
        <span style={{ "--i": 22 } as React.CSSProperties}><b>|</b></span>
        <span style={{ "--i": 23 } as React.CSSProperties}><b>|</b></span>
        <span style={{ "--i": 24 } as React.CSSProperties}><b>00</b></span>
      </div>
    </div>
  );
};

export default Clock;
