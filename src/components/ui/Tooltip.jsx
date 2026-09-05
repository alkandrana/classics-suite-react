import {useState} from "react";
import './Tooltip.css'
export default function Tooltip({text, children}){
    const [isVisible, setisVisible] = useState(false);

    return (
        <div className="tooltip-container" onMouseEnter={() => setisVisible(true)} onMouseLeave={() => setisVisible(false)} onFocus={() => setisVisible(true)} onBlur={() => setisVisible(false)}>
            {children}
            {isVisible && (
                <div className="tooltip">
                    {text}
                </div>
            )}
        </div>
    );
}