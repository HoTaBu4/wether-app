import React ,{useContext}from 'react'
import  ContextM  from '../../context/context'
import  './podcastMenuStyle.css'
const PodcastMenu = () => {
    const podcastFor7Days = () =>{
        
    }
    const podcastFor10Days = () =>{

    }
    const theme = useContext(ContextM)
    console.log(theme);
    
    return (
        <div className="podcastMenu">
            <div className={theme 
            ?
                'white main_style button black_background'
            :
                'black main_style button '
            }
            onClick ={podcastFor7Days}
            >for week</div>
            <div
            className={theme
            ?
                'white main_style button black_background'
            :
                'black main_style button '
            }
            onClick ={podcastFor10Days}
            >for ten days</div>
        </div>
    )
}
export default PodcastMenu