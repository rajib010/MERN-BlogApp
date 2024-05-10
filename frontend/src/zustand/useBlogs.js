import { create } from 'zustand';

const useBlogs = create((set) => ({
    selectedBlog: null,
    setSelectedBlog: (selectedBlog) => set({ selectedBlog }),
    blogs:[],
    setBlogs:(blogs)=>set({blogs})
}))

export default useBlogs;