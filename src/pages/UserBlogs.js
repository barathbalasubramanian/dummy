import React from 'react'
import { db   } from './firebase'
import { collection , getDocs } from "firebase/firestore";

function UserBlogs() {

    const [blogs, setBlogs] = React.useState({})
    async function getBlogs() {
        const blogCollection = await getDocs(collection(db,"Address"));
        blogCollection.forEach((doc) => {
            blogs[doc.id] = doc.data();
        });
        console.log(blogs)
    } 
    getBlogs()

    return (
    <div>
      <header>Blogs</header>
      <div>

      </div>
    </div>
  )
}

export default UserBlogs
