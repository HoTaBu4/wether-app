import React,{useContext} from 'react'
import ContextM from '../../context/context'
import { useCustomSelector } from '../../hooks/store'
import CustomImg from '../customImg/CustomImg'
import TodayInfoDetails from './TodayInfoDetails'


const TodayInfo = () => {
    const theme = useContext(ContextM)
     const {wether} = useCustomSelector(state => state.currentWetherSliceReducer)
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
                            {wether.current.temp_c}° 
                        </div>
                        <CustomImg text={wether.current.condition.icon}/>
                        </div>
                    <div className={theme 
                    ?
                    "white todayInfo_Main_day"
                    :
                    "black todayInfo_Main_day" 
                    }>
                        today</div>
                   
                </div>
                <div className="Main_footer">
                    <div className="Main_footer_time">time:{}</div>
                    <div className="Main_footer_location">city</div>
                </div>
            </div>
            <div className={theme 
            ?
            "black_background today_info_details"
            :
            " today_info_details"
            }>
                <TodayInfoDetails/>
            </div>
        </div>
    )
}
export default TodayInfo