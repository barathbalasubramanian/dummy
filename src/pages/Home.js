import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navi = useNavigate();
    function GoBlog() {
        navi("/blog")
    }
    function GoSocial() {
        navi("/sociohome")
    }
    function GoDashbrd() {
        navi("/dashboard")
    }
    function logouthandler() {
        navi('/')
    }

    return (
        <>
            <header className='header'>
                <div className='title '>Content Creator</div>
                <div className='menu'>
                    <div>User</div>
                    <button onClick={GoDashbrd}>DashBoard</button>
                    <button onClick={logouthandler}>Logout</button>
                </div>
            </header>
            <div className='opt'>
                <div className='blog' onClick={GoBlog}>
                    <div className='tit'>Blog Creation</div>
                    <div className='desc'>Creating a blog involves designing and developing a platform where individuals or organizations can publish articles, stories, or multimedia content. It typically includes features such as user authentication, content management, commenting systems, and search functionalities to enhance user engagement and accessibility.</div>
                </div>
                <div className='social' onClick={GoSocial}>
                    <div className='tit'>Social Media Content Creation</div>
                    <div className='desc'>Social media content creation involves crafting engaging and visually appealing posts, images, videos, or stories tailored to specific platforms like Facebook, Instagram, Twitter, or LinkedIn. It often includes strategies to resonate with the target audience, such as using hashtags, emojis, compelling captions, and multimedia elements. The goal is to drive engagement, increase brand awareness, and foster meaningful interactions with followers.</div>
                </div>
            </div>
        </>
    )
}

export default Home