import React from 'react'

function Page4({accessToken,handleNext}) {
  return (
    <div>
      <h1>Your are on page 4 with user</h1>
      <button onClick={handleNext} >NEXT STEP</button>
      </div>
  )
}

export default Page4