import React from 'react'
import { NavLink } from 'react-router-dom'
import AddAUserButton from '../../Adding/AddAUser/AddAUserButton'


export default function Home() {
    return (
        <div>
            <nav className='home-nav'>

                <NavLink to="users">
                    <img src='user.png'/>
                    <div style={{textAlign: 'center'}}>Users</div>
                </NavLink>

                <NavLink to="posts">
                    <img src='post.png'/>
                    <div style={{textAlign: 'center'}}>Posts</div>
                </NavLink>

                <NavLink to="tags">
                    <img src='tag.png'/>
                    <div style={{textAlign: 'center'}}>Tags</div>
                </NavLink>
            </nav>
        </div>
    )
}
