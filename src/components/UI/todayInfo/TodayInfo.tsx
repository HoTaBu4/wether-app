import React,{useContext} from 'react'
import ContextM from '../../context/context'
import { useCustomSelector } from '../../hooks/store'
import CustomImg from '../customImg/CustomImg'
import TodayInfoDetails from './TodayInfoDetails'
import { ForecastDay } from '../../../store/types/types'

interface TodayInfoProps {
    selectedForecastDay: ForecastDay | null;
}

const TodayInfo = ({ selectedForecastDay }: TodayInfoProps) => {
    const theme = useContext(ContextM)
    const {wether, location} = useCustomSelector(state => state.currentWetherSliceReducer)

    const now = new Date();

    const fallbackDay = new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(now);
    const fallbackDate = new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long' }).format(now);
    const fallbackTime = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(now);

    const displayTemp = selectedForecastDay
        ? Math.round(selectedForecastDay.maxTempC)
        : Math.round(wether.current.temp_c);

    const displayDayLabel = selectedForecastDay ? selectedForecastDay.weekday : fallbackDay;
    const displayDateLabel = selectedForecastDay ? selectedForecastDay.dateLabel : fallbackDate;
    const footerTimeLabel = selectedForecastDay
        ? `Date: ${selectedForecastDay.dateLabel}`
        : `Time: ${fallbackTime}`;

    const displayIcon = selectedForecastDay ? selectedForecastDay.icon : wether.current.condition.icon;
    const displayDescription = selectedForecastDay ? selectedForecastDay.description : 'Current weather';

    const locationLabel = location
        ? `${location.name}${location.country ? `, ${location.country}` : ''}`
        : 'Unknown location';

    return(
        <div className="todayInfo">
            <div className={theme 
                ?
                'background_black todayInfo_Main'
                :
                'background_white todayInfo_Main'
                }>
                <div className='Main_info' >
                    <div className='Main_img'>
                        <div className="Main_info_temprature">
                            {displayTemp}° 
                        </div>
                        <CustomImg src={displayIcon} alt={displayDescription}/>
                        </div>
                    <div className={theme 
                    ?
                    "white todayInfo_Main_day"
                    :
                    "black todayInfo_Main_day" 
                    }>
                        {displayDayLabel}
                    </div>
                    <div className="todayInfo_Main_date gray">
                        {displayDateLabel}
                    </div>
                   
                </div>
                <div className="Main_footer">
                    <div className="Main_footer_time">{footerTimeLabel}</div>
                    <div className="Main_footer_location">Location: {locationLabel}</div>
                </div>
            </div>
            <div className={theme 
            ?
            "black_background today_info_details"
            :
            " today_info_details"
            }>
                <TodayInfoDetails forecastDay={selectedForecastDay}/>
            </div>
        </div>
    )
}
export default TodayInfo
