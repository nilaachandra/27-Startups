import React from 'react'
import Header from './Components/Header'
import Homepage from './Pages/Homepage'
import Footer from './Components/Footer'

const Layout = () => {
  return (
    <div className={`flex flex-col items-center w-full p-3 bg-light-bg min-h-screen lg:p-6`}>
        <Header/>
            <main className='lg:w-1/2 sm:w-full w-full p-2'>
                <Homepage/>
            </main>
        <Footer/>
    </div>
  )
}

export default Layout