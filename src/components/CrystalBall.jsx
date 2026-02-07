import { useState, useEffect } from 'react';
import './CrystalBall.css';

export default function CrystalBall({ isActive, children }) {
    return (
        <div className={`crystal-ball-container ${isActive ? 'active' : ''}`}>
            <div className="crystal-ball">
                {/* Outer glow ring */}
                <div className="glow-ring"></div>

                {/* The orb itself */}
                <div className="orb">
                    {/* Inner swirling mist */}
                    <div className="mist-layer mist-1"></div>
                    <div className="mist-layer mist-2"></div>
                    <div className="mist-layer mist-3"></div>

                    {/* Content inside the ball */}
                    <div className="orb-content">
                        {children}
                    </div>

                    {/* Glass reflection */}
                    <div className="glass-reflection"></div>
                </div>

                {/* Base/Stand */}
                <div className="crystal-stand">
                    <div className="stand-top"></div>
                    <div className="stand-middle"></div>
                    <div className="stand-bottom"></div>
                </div>

                {/* Floating runes when active */}
                {isActive && (
                    <div className="runes-container">
                        <span className="rune" style={{ '--i': 0 }}>☽</span>
                        <span className="rune" style={{ '--i': 1 }}>✧</span>
                        <span className="rune" style={{ '--i': 2 }}>⚘</span>
                        <span className="rune" style={{ '--i': 3 }}>♠</span>
                        <span className="rune" style={{ '--i': 4 }}>☀</span>
                        <span className="rune" style={{ '--i': 5 }}>❋</span>
                    </div>
                )}
            </div>
        </div>
    );
}
