import React from 'react'

function Content() {
  return (
    <div className="hero max-h-screen max-w-[45vw] my-2 mx-auto bg-base-400 border border-gray-300 rounded-lg ">
      <div className="hero-content flex-col lg:flex-row">
        <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-lg rounded-lg shadow-2xl" />
        <div>
          {/* <h1 className="text-5xl font-bold">{Blogs.heading}</h1>
          <p className="py-6">{Blogs.description}</p>
          <button className="btn btn-primary">Read More!</button>
          <h3 className='text-5xl font-bold'>{Blogs.author}</h3> */}
          <h1 className="text-4xl font-bold">Home Comming of </h1>
          <p className="py-6">Description</p>
          <button className="btn btn-primary">Read More!</button>
          <h3 className='text-xl mt-4 font-bold'>Author</h3>
        </div>
      </div>
    </div>
  )
}

export default Content