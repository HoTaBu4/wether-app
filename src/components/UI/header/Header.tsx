import React, { useContext, useEffect, useState }  from 'react';
import './headerStyles.css';
import ThemeChange from '../../ThemChange/ThemeChange';
import  ContextM  from '../../context/context';

type HeaderProps = {
    getTheme: (data:boolean)=>void;
    city: string;
    onCityChange: (city: string) => void;
};

const Header:React.FC<HeaderProps> = ({ getTheme, city, onCityChange }) => {
    const theme = useContext(ContextM);
    const [cityInput, setCityInput] = useState(city);

    useEffect(() => {
        setCityInput(city);
    }, [city]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = cityInput.trim();
        if (!trimmed) {
            return;
        }
        onCityChange(trimmed);
        setCityInput(trimmed);
    };

    const headerClass = theme ? 'header header--dark' : 'header header--light';

    return (
        <header className={headerClass}>
            <div className="header_logo">
                <img src="./img/header/logo.svg" alt="logo" />
                <div className="logo_title">REACT WETHER</div>
            </div>
            <div className="header_settings">
                <ThemeChange getTheme={getTheme}/>
                <form className={`location_form ${theme ? 'location_form--dark' : 'location_form--light'}`} onSubmit={handleSubmit}>
                    <label htmlFor="city-input" className="location_label">
                        City
                    </label>
                    <input
                        id="city-input"
                        type="text"
                        className="location_input"
                        value={cityInput}
                        onChange={(event) => setCityInput(event.target.value)}
                        placeholder="Enter city name"
                    />
                    <button type="submit" className="location_submit">
                        Update
                    </button>
                </form>
            </div>
        </header>
    );
};

export default Header;
