import React, { useEffect, useState } from 'react';

    const RouletteWheel = ({ result }) => {
      const [spinning, setSpinning] = useState(false);
      const [angle, setAngle] = useState(0);

      useEffect(() => {
        if (result !== null) {
          setSpinning(true);
          const totalAngle = 360 * 5 + (result / 37) * 360; // 5 full spins + result angle
          let start = null;

          const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const currentAngle = (progress / 3000) * totalAngle; // 3 seconds for full spin
            setAngle(currentAngle);
            if (progress < 3000) {
              requestAnimationFrame(animate);
            } else {
              setSpinning(false);
            }
          };

          requestAnimationFrame(animate);
        }
      }, [result]);

      return (
        <div
          className="roulette-wheel"
          style={{
            transform: `rotate(${angle}deg)`,
            transition: spinning ? 'transform 3s ease-out' : 'none',
          }}
        >
          {Array.from({ length: 37 }, (_, i) => (
            <div
              key={i}
              className="roulette-segment"
              style={{
                transform: `rotate(${i * (360 / 37)}deg) skewY(60deg)`,
                backgroundColor: i === 0 ? 'green' : i % 2 === 0 ? 'black' : 'red',
              }}
            >
              <span>{i}</span>
            </div>
          ))}
        </div>
      );
    };

    export default RouletteWheel;
