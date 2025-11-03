import React, { useState ,useEffect, useCallback} from 'react'
import { useFetching } from '../../hooks/useFething';
import { Days } from '../cards/days';
import { Wether } from '../../../store/types/types';

const DEFAULT_FORECAST_DAYS = 7;

const WetherInfo = () => {
  
  const [parser,isLoading,error] = useFetching()
  const [data,setData] = useState<Wether | null>(null)
  const [selectedDays, setSelectedDays] = useState<number>(DEFAULT_FORECAST_DAYS)

  const handleSelectDays = useCallback(async (days: number) => {
    setSelectedDays(days);
    const dataNeed = await parser(days);
    if (dataNeed) {
      setData(dataNeed);
      setSelectedDays(dataNeed.forecast?.requestedDays ?? days);
    }
  }, [parser])

  useEffect(() => {
    handleSelectDays(DEFAULT_FORECAST_DAYS);
  }, [handleSelectDays]); 

  const forecastDays = data?.forecast?.days ?? [];
  const showLoading = isLoading || !data;
  const errorMessage = error instanceof Error ? error.message : error ? 'Unable to load forecast' : null;

  return(
    <div className="wether_info">
        {errorMessage && (
          <div className="error_message">{errorMessage}</div>
        )}
        <Days
          forecastDays={forecastDays}
          onSelectDays={handleSelectDays}
          selectedDays={selectedDays}
          isLoading={showLoading}
        />
      </div>
  )
}
export default WetherInfo
