import React, { useContext }  from 'react'
import './headerStyles.css'
import ThemeChange from '../../ThemChange/ThemeChange'
import  ContextM  from '../../context/context';


type IntermediateProps = {
    getTheme: (data:boolean)=>{}
};


const Header :React.FC<IntermediateProps> = (props) => {
    const theme = useContext(ContextM)
    const chooseCountry = () =>{

    }
    return (
        <header className='header'>
            <div className="header_logo">
                <img src="./img/header/logo.svg" alt="logo" />
                <div className="logo_title">REACT WETHER</div>
            </div>
            <div className="header_settings">
                <ThemeChange getTheme ={props.getTheme}/>
                <div className={`${theme ? ' dark_background ' : ' white_background '  } settings_country`}
                    onClick={chooseCountry}
                > 
                    <div className={`${theme ? 'white_color' : 'black_color'}`}>
                        choose country 
                    </div> 
                    <img src='./img/header/arrow.svg' alt='arrow'/> 
                </div>
            </div>
        </header>
    )
}
export default Header