import React from 'react'
import {useState} from 'react'



type Intermediate2Props = {
    getTheme: (data: boolean) => void;
  }; 

const ThemeChange :React.FC<Intermediate2Props> = (props) =>{
    const [theme,setTheme] = useState(false)
    
        const ChangeTheme = () =>{
            setTheme(!theme)
            props.getTheme(theme)
        }
   
    return(
        <img 
            src="./img/header/themeChange.svg" 
            alt="" 
            onClick={():void => {ChangeTheme()}}    
        />
    )
}
export default ThemeChange