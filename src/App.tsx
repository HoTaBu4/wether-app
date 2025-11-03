
import React, { useEffect, useState } from 'react';
import './App.css';
import  ContextM  from './components/context/context';
import { useCustomDispatch } from './components/hooks/store';
import Header from './components/UI/header/Header';
import Main from './components/UI/main/Main';
import { fetchCurrentWether } from './store/thunks/fetchCurrentWether';
import { ForecastDay } from './store/types/types';


function App() {
  const [themeChange ,setThemeChange] = useState(Boolean)
  const [selectedForecastDay, setSelectedForecastDay] = useState<ForecastDay | null>(null);
  const getTheme = ( data :boolean)=>{
     setThemeChange(data)
     return data
  }

  const dispatch = useCustomDispatch()
  useEffect(() => {
    dispatch(fetchCurrentWether('london'))
  },[])
  
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
          <Header getTheme={getTheme} />
          <Main
            selectedForecastDay={selectedForecastDay}
            onSelectForecastDay={(day) => setSelectedForecastDay(day)}
          />
        </ContextM.Provider>
      </div>
    </div>
  );
}

export default App;
