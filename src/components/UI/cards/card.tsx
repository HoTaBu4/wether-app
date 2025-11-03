import React, { useContext } from "react";
import ContextM from "../../context/context";
import { ForecastDay } from "../../../store/types/types";
import "./cartStyle.css";

interface Props {
    day: ForecastDay;
}

const Card = ({ day }: Props) => {
    const theme = useContext(ContextM);
    const maxTemp = Math.round(day.maxTempC);
    const minTemp = Math.round(day.minTempC);

    const cardClass = theme ? "black_card card" : "white_card card";
    const titleClass = theme ? "white day_of_week" : "black day_of_week";
    const temperatureClass = theme ? "white day_temperature" : "black day_temperature";

    return (
        <div className={cardClass}>
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
