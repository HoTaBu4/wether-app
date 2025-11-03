import React from "react";
import TodayInfo from "../todayInfo/TodayInfo";
import WetherInfo from "../wetherInfo/WetherInfo";
import { ForecastDay } from "../../../store/types/types";

interface MainProps {
    selectedForecastDay: ForecastDay | null;
    onSelectForecastDay: (day: ForecastDay | null) => void;
    city: string;
}

const Main = ({ selectedForecastDay, onSelectForecastDay, city }: MainProps) => {
    return (
        <>
            <TodayInfo selectedForecastDay={selectedForecastDay}/>
            <WetherInfo
                selectedForecastDay={selectedForecastDay}
                onSelectForecastDay={onSelectForecastDay}
                city={city}
            />
        </>
    );
};

export default Main;
