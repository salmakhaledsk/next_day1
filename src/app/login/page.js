import React from 'react'
import { signIn } from '../auth'

function login() {
    async function loginn(){
        "use server"

       await signIn("google",{redirectTo:"/products" })

        }
    

  return (
    <>
      {/* login */}
      <form action={loginn}>


      <button className='btn btn-dark'> sign in </button>
      </form>

    </>
  )

}
export default login
