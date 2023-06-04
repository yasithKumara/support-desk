import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
        <div className="logo">
            <Link to='/'>Support Desk</Link>
        </div>
        <ul>
            <li>
                <Link to='/register'><FaSignInAlt/>Login</Link>
            </li>
            <li>
                <Link to='/login'><FaUser/>Register</Link>
            </li>
        </ul>
    </header>
  )
}

export default Header