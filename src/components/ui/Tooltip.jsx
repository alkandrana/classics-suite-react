import { useState } from 'react';
export default function Tooltip({ text, children }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div id="tooltip-container" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} onFocus={() => setIsVisible(true)} onBlur={() => setIsVisible(false)}>
            {children}
            {isVisible && (
                <div id="tooltip">
                    {text}
                </div>
            )}
        </div>
    );
}
