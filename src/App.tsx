
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import  ContextM  from './components/context/context';
import { useCustomDispatch } from './components/hooks/store';
import Header from './components/UI/header/Header';
import Main from './components/UI/main/Main';
import { fetchCurrentWether } from './store/thunks/fetchCurrentWether';
import { ForecastDay } from './store/types/types';


function App() {
  const [themeChange ,setThemeChange] = useState<boolean>(false);
  const [city, setCity] = useState<string>('London');
  const [selectedForecastDay, setSelectedForecastDay] = useState<ForecastDay | null>(null);

  const dispatch = useCustomDispatch();

  const handleThemeChange = useCallback(( data :boolean)=>{
     setThemeChange(data);
     return data;
  },[]);

  const handleSelectForecastDay = useCallback((day: ForecastDay | null) => {
    setSelectedForecastDay(day);
  }, []);

  const handleCityChange = useCallback((nextCity: string) => {
    const trimmed = nextCity.trim();
    if (!trimmed) {
      return;
    }
    setCity(trimmed);
    setSelectedForecastDay(null);
  }, []);

  useEffect(() => {
    dispatch(fetchCurrentWether(city));
  },[dispatch, city]);
  
  return (
    <div className={themeChange
    ?
      'wrapper black_bg'
    :
      "wrapper white_bg"
    }>
      <div className='App'>
        <ContextM.Provider 
          value={themeChange}
          >
          <Header
            getTheme={handleThemeChange}
            city={city}
            onCityChange={handleCityChange}
          />
          <Main
            selectedForecastDay={selectedForecastDay}
            onSelectForecastDay={handleSelectForecastDay}
            city={city}
          />
        </ContextM.Provider>
      </div>
    </div>
  );
}

export default App;
