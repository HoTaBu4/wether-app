import React from "react";
import TodayInfo from "../todayInfo/TodayInfo";
import WetherInfo from "../wetherInfo/WetherInfo";
import { ForecastDay } from "../../../store/types/types";

interface MainProps {
    selectedForecastDay: ForecastDay | null;
    onSelectForecastDay: (day: ForecastDay | null) => void;
}

const Main = ({ selectedForecastDay, onSelectForecastDay }: MainProps) => {
    return (
        <>
            <TodayInfo selectedForecastDay={selectedForecastDay}/>
            <WetherInfo
                selectedForecastDay={selectedForecastDay}
                onSelectForecastDay={onSelectForecastDay}
            />
        </>
    );
};

export default Main;
