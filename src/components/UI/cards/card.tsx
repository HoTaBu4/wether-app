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

    return (
        <div
            className={
                theme
                    ? "black_card card"
                    : "white_card card"
            }
        >
            <div
                className={
                    theme
                        ? "white day_of_week"
                        : "black day_of_week"
                }
            >
                {day.weekday}
            </div>
            <div className="day_date gray">{day.dateLabel}</div>
            <img src={day.icon} alt={day.description} />
            <div
                className={
                    theme
                        ? "white day_temperature"
                        : "black day_temperature"
                }
            >
                {`${maxTemp}°`}
            </div>
            <div className="night_temperature gray main_font">
                {`${minTemp}°`}
            </div>
            <div className="wether_of_day gray main_font">
                {day.description}
            </div>
        </div>
    );
};

export default Card;
