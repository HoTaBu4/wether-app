import { useContext } from 'react'
import  ContextM  from "../../context/context";
import Card from "./card";
import './cartStyle.css'
import PodcastMenu from "../podcastMenu/podcastMenu";
import { ForecastDay } from '../../../store/types/types';

interface Props{
  forecastDays: ForecastDay[];
  onSelectDays: (days: number) => void;
  selectedDays: number;
}

export const Days = ({forecastDays, onSelectDays, selectedDays}:Props) =>{
 const theme = useContext(ContextM)
 return(
  <div className="podcast">
     <PodcastMenu onSelect={onSelectDays} selectedDays={selectedDays}/>
      <div className={theme
      ?
      'black-background box_of_cards'
      :
      'white box_of_cards'
      }>
        {forecastDays.length > 0
          ? forecastDays.map(day => <Card day={day} key={day.isoDate}/>)
          : <div className="no_forecast_message">No forecast data available.</div>
        }
      </div>
  </div>
 )
 
}
