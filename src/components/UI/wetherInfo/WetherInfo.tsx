import React, { useState ,useEffect, useCallback} from 'react'
import { useFetching } from '../../hooks/useFething';
import { Days } from '../cards/days';
import { ForecastDay, Wether } from '../../../store/types/types';

const DEFAULT_FORECAST_DAYS = 7;

interface WetherInfoProps {
  selectedForecastDay: ForecastDay | null;
  onSelectForecastDay: (day: ForecastDay | null) => void;
}

const WetherInfo = ({ selectedForecastDay, onSelectForecastDay }: WetherInfoProps) => {
  const [parser,isLoading,error] = useFetching()
  const [data,setData] = useState<Wether | null>(null)
  const [selectedDays, setSelectedDays] = useState<number>(DEFAULT_FORECAST_DAYS)

  const handleSelectDays = useCallback(async (days: number) => {
    setSelectedDays(days);
    const dataNeed = await parser(days);
    setData(dataNeed);
    if (dataNeed) {
      setSelectedDays(dataNeed.forecast?.requestedDays ?? days);
    } else {
      onSelectForecastDay(null);
    }
  }, [parser, onSelectForecastDay])

  useEffect(() => {
    handleSelectDays(DEFAULT_FORECAST_DAYS);
  }, [handleSelectDays]); 

  const forecastDays = data?.forecast?.days ?? [];
  const showLoading = isLoading || !data;

  useEffect(() => {
    if (showLoading) {
      return;
    }

    if (!forecastDays.length) {
      onSelectForecastDay(null);
      return;
    }

    const selectedExists = selectedForecastDay
      ? forecastDays.some(day => day.isoDate === selectedForecastDay.isoDate)
      : false;

    if (!selectedExists) {
      onSelectForecastDay(forecastDays[0]);
    }
  }, [showLoading, forecastDays, onSelectForecastDay, selectedForecastDay]);

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
          onSelectForecastDay={onSelectForecastDay}
          selectedForecastDayId={selectedForecastDay?.isoDate}
        />
      </div>
  )
}
export default WetherInfo
