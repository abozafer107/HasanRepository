
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'
import AddAUserButton from '../Adding/AddAUser/AddAUserButton'
import AddAPostButton from '../Adding/AddAPost/AddAPostButton'
import AddATagButton from '../Adding/AddATag/AddATagButton'

export default function RootLayout() {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <h1>API Sample Test</h1>
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="users">Users</NavLink>
                    <NavLink to="posts">Posts</NavLink>
                    <NavLink to="tags">Tags</NavLink>
                </nav>
                <nav className='adding'>
                    {<AddAUserButton />}
                    {<AddAPostButton />}
                </nav>
                
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
