import React from 'react'
import { auth } from '../auth'
export const metadata = {
  title: 'Contact',
  description: 'This is contact page',
}

async function Contact() {
  const user=  await auth()
  console.log(user)
  return (
    <div>
      contact
      {(user)? <h1>hello {user.user.name}</h1>:<h3>you must login first </h3>}
     
    </div>
  )
}

export default Contact
