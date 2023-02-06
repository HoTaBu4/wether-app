import  ContextM  from "../../context/context";
import Card from "./card";
import {useContext} from 'react'
import './cartStyle.css'
import PodcastMenu from "../podcastMenu/podcastMenu";

interface Props{}
export interface day{
    day:string;
    day_info:string;
    icon_id:string;
    temp_day:string;
    temp_night:string;
    info:string;
  }
export const Days = (props:Props) =>{
 const Day:day[] =[{
      day:'torday',
      day_info: '24february',
      icon_id:'sun',
      temp_day:'+18',
      temp_night:'-1',
      info:'sunny',},
      {
        day:'tommorow',
        day_info: '25february',
        icon_id:'sun',
        temp_day:'+18',
        temp_night:'-1',
        info:'sunny',},
        {
          day:'23',
          day_info: '26february',
          icon_id:'sun',
          temp_day:'+18',
          temp_night:'-1',
          info:'sunny',},
          {
            day:'29',
            day_info: '27february',
            icon_id:'sun',
            temp_day:'+18',
            temp_night:'-1',
            info:'sunny',},
            {
              day:'30',
              day_info: '28february',
              icon_id:'sun',
              temp_day:'+18',
              temp_night:'-1',
              info:'sunny',},
              {
                day:'31',
                day_info: '29february',
                icon_id:'sun',
                temp_day:'+18',
                temp_night:'-1',
                info:'sunny',},
                {
                  day:'32',
                  day_info: '30february',
                  icon_id:'sun',
                  temp_day:'+18',
                  temp_night:'-1',
                  info:'sunny',}
 ]
 const theme = useContext(ContextM)
 return(
  <div className="podcast">
     <PodcastMenu/>
      <div className={theme
      ?
      'black-background box_of_cards'
      :
      'white box_of_cards'
      }>
        {Day.map(elem =>
          <Card Day={elem} key={elem.day}/>)}
      </div>
  </div>
 )
 
}