import Head from 'next/head'
import React from 'react'
import Footer from '../footer/Footer';
import NavBar from './../navbar/NavBar';

const Layout = ({children, title}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Store | {title} </title>
      </Head>
      
      <NavBar/>

      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout