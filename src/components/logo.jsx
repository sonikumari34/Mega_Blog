import React from "react";

function Logo({width='100px'}){
    return (
        <h1 className='text-5xl font-extrabold tracking-wide uppercase text-white transition duration-500 hover:text-gray-300' style={{ fontFamily: 'Lobster, cursive', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        Tech Blog
      </h1>
    )
}
export default Logo