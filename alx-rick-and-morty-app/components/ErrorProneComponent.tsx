import React from 'react'

const  ErrorProneComponent: React.FC=()=>{
        throw new Error("This is a test error!");
}


export default ErrorProneComponent
