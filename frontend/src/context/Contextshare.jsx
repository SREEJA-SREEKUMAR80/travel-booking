import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const searchKeyContext=createContext("")
export const userProfileUpdateStatusContext=createContext("")

const Contextshare = ({children}) => {

    const [searchKey,setSearchKey]=useState("")
    const[userProfileUpdateStatus,setUserProfileUpdateStatus]=useState({})
    
  return (
    <userProfileUpdateStatusContext.Provider value={{userProfileUpdateStatus,setUserProfileUpdateStatus}}>
      <searchKeyContext.Provider value={{searchKey,setSearchKey}}>
  
          {
              children
          }
  
      </searchKeyContext.Provider>
    </userProfileUpdateStatusContext.Provider>

  )
}

export default Contextshare