import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/footer'
import useGetBlogs from '../../hooks/useGetBlogs.js'
import Content from '../../components/content/Content.jsx'

function Home() {

  const {getBlogs, loading} = useGetBlogs()
  useEffect(()=>{

  },[])
  return (
    <div>
      <Content />
    </div>
  )
}

export default Home