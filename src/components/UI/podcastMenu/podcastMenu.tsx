import React, { useContext } from 'react';
import ContextM from '../../context/context';
import './podcastMenuStyle.css';

interface PodcastMenuProps {
    onSelect: (days: number) => void;
    selectedDays: number;
}

const PodcastMenu = ({ onSelect, selectedDays }: PodcastMenuProps) => {
    const theme = useContext(ContextM);

    const buildButtonClass = (isActive: boolean) => {
        const modeClass = theme ? 'button dark' : 'button light';
        const baseClass = `main_style ${modeClass}`;
        return isActive ? `${baseClass} button_active` : baseClass;
    };

    return (
        <div className="podcastMenu">
            <button
                type="button"
                className={buildButtonClass(selectedDays === 7)}
                onClick={() => onSelect(7)}
                aria-pressed={selectedDays === 7}
            >
                for week
            </button>
            <button
                type="button"
                className={buildButtonClass(selectedDays === 10)}
                onClick={() => onSelect(10)}
                aria-pressed={selectedDays === 10}
            >
                for ten days
            </button>
        </div>
    );
};

export default PodcastMenu;
