import React from 'react'

type text= {
    text:string
}

const CustomImg = (text:text) =>{
    console.log(text);
    
    
    return(
        <>
        <img src="./img/day/113.png" alt="" />
        </>
    )
}
export default CustomImg