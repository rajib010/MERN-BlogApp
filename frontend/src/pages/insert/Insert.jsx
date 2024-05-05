import React, { useState } from 'react'
import { useCreateBlogs } from "../../hooks/useCreateBlogs.js"

function Insert() {

  const initialInputs = {
    heading: "",
    description: "",
    image: null
  }

  const [inputs, setInputs] = useState(initialInputs);
  const { loading, createBlogs } = useCreateBlogs();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!inputs.heading || !inputs.description || !inputs.image){
      alert ("Please fill in all the fields");
      return;
    }
    await createBlogs(inputs);// run hook
    setInputs(initialInputs); //reset
    alert("Blog created successfully")
  }

  //separate function to handle the file upload
  const handleFileChange = async (e) => {
    setInputs({ ...inputs, image: e.target.files[0] });
  }


  return (
    <div className='flex flex-col w-[50vw] mx-auto p-4 gap-5'>
      <h1 className='text-white text-4xl my-3 font-bold'>Create your new Blog!!</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-md">
          <div className="label">
            <span className="label-text text-[1.3vw]">Heading </span>
          </div>
          <input type="text" placeholder="Type here" className="input input-bordered input-md w-full max-w-md h-10" value={inputs.heading} onChange={(e) => { setInputs({ ...inputs, heading: e.target.value }) }} />
        </label>
        <label className="form-control w-full max-w-md">
          <div className="label">
            <span className="label-text text-[1.3vw]">Description</span>
          </div>
          <textarea className="textarea textarea-bordered input-md h-24" placeholder="Description" value={inputs.description} onChange={(e) => setInputs({ ...inputs, description: e.target.value })}></textarea>
        </label>
        <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange} />

        <div>
        <button className="btn max-w-sm text-white text-xl font-thin bg-blue-800 " disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Post"}
          </button>
        </div>

      </form>
    </div>
  )
}

export default Insert