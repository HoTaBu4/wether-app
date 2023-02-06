
import React, { useEffect, useState } from 'react';
import './App.css';
import  ContextM  from './components/context/context';
import { useCustomDispatch } from './components/hooks/store';
import Header from './components/UI/header/Header';
import Main from './components/UI/main/Main';
import { fetchCurrentWether } from './store/thunks/fetchCurrentWether';


function App() {
  const [themeChange ,setThemeChange] = useState(Boolean)
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
      'App black_bg'
    :
      "App white_bg"
    }>
      <ContextM.Provider 
        value={themeChange}
        >
        <Header getTheme={getTheme} />
        <Main/>
      </ContextM.Provider>
    </div>
  );
}

export default App;
