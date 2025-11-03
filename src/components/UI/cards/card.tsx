import React, { KeyboardEvent, useContext } from "react";
import ContextM from "../../context/context";
import { ForecastDay } from "../../../store/types/types";
import "./cartStyle.css";

interface Props {
    day: ForecastDay;
    isSelected?: boolean;
    onSelect?: (day: ForecastDay) => void;
}

const Card = ({ day, isSelected = false, onSelect }: Props) => {
    const theme = useContext(ContextM);
    const maxTemp = Math.round(day.maxTempC);
    const minTemp = Math.round(day.minTempC);

    const cardClass = `${theme ? "black_card" : "white_card"} card${isSelected ? " selected_card" : ""}`;
    const titleClass = theme ? "white day_of_week" : "black day_of_week";
    const temperatureClass = theme ? "white day_temperature" : "black day_temperature";

    const handleSelect = () => {
        if (onSelect) {
            onSelect(day);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect();
        }
    };

    return (
        <div
            className={cardClass}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
        >
            <div className="card_header">
                <div className="card_header_text">
                    <div className={titleClass}>{day.weekday}</div>
                    <div className="day_date gray">{day.dateLabel}</div>
                </div>
                <img className="card_icon" src={day.icon} alt={day.description} />
            </div>
            <div className="card_body">
                <div className="temp_wrapper">
                    <span className={`temp_max ${temperatureClass}`}>{`${maxTemp}°`}</span>
                    <span className="temp_min gray main_font">{`${minTemp}°`}</span>
                </div>
                <div className="wether_of_day gray main_font">
                    {day.description}
                </div>
            </div>
        </div>
    );
};

export default Card;
