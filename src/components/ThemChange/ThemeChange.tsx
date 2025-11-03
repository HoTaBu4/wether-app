import React, { useEffect, useState } from 'react';
import './themeChange.css';

interface ThemeChangeProps {
    getTheme: (data: boolean) => void;
}

const ThemeChange: React.FC<ThemeChangeProps> = ({ getTheme }) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        getTheme(isDark);
    }, [isDark, getTheme]);

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };

    return (
        <button
            type="button"
            className={`theme_toggle ${isDark ? 'theme_toggle--dark' : 'theme_toggle--light'}`}
            onClick={toggleTheme}
            aria-pressed={isDark}
            aria-label="Toggle visual theme"
        >
            <span className="theme_toggle__icon" aria-hidden="true">
                {isDark ? '🌙' : '☀️'}
            </span>
            <span className="theme_toggle__label">
                {isDark ? 'Dark mode' : 'Light mode'}
            </span>
        </button>
    );
};

export default ThemeChange;
