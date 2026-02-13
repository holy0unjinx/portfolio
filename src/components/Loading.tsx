import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import "./Loading.css";

export default function FullScreenLoader() {
  const { progress, active } = useProgress();

  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  useEffect(() => {
    let frame: number;

    const animate = () => {
      setDisplayProgress((prev) => {
        let target = progress;

        // 0~30% 구간은 자동 상승
        if (progress < 30) {
          target = 30;
        }

        const diff = target - prev;

        if (Math.abs(diff) < 0.05) return target;

        const speed =
          prev < 30
            ? 0.01 // 초반 매우 천천히
            : prev < 80
              ? 0.05 // 중반
              : 0.08; // 후반 살짝 가속

        return prev + diff * speed;
      });

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [progress]);

  useEffect(() => {
    if (!active && progress === 100 && displayProgress >= 100) {
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 300);

      const removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 1100);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [active, progress, displayProgress]);

  if (!isVisible) return null;

  return (
    <div className={`loader-wrapper ${isFading ? "fade-out" : ""}`}>
      <div className="loader-center">
        <p className="loader-title">LOADING</p>
        <p className="loader-percent">{Math.floor(displayProgress)}%</p>
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${Math.floor(displayProgress)}%` }}
        />
      </div>
    </div>
  );
}
