import { useState } from "react";
import "./Tooltip.css";

export default function Tooltip({ text, children, text2 = null }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="tooltip-container text-amber-500"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="tooltip">
          {text}
          {text2 && (<div>{text2}</div>)}
        </div>
      )}
    </div>
  );
}
