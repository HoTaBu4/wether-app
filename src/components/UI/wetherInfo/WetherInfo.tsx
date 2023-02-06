import React, { useState ,useEffect, useContext} from 'react'
import ContextM  from '../../context/context';
import { useFetching } from '../../hooks/useFething';
import { Days } from '../cards/days';
import IsLoading from '../isLoading/IsLoading';


const WetherInfo = () => {
  const theme = useContext(ContextM)
  
  const [parser,isLoading,error] = useFetching()
    const [data,setData] = useState()
    useEffect(() => {
        async function fetchData() {
          const dataNeed = await parser();
          setData(dataNeed);
        }
        fetchData();
      }, []); 

      
    return(
        <div className="wether_info">
           {isLoading
          ?
          <IsLoading/>
          : 
          <Days/>
          }
        </div>
    )
}
export default WetherInfo