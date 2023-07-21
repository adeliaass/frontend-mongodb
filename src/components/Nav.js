import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            <img
            src="https://i.imgur.com/f6EnS8o.png" 
            alt='kucing'
            className='logo'
            />
            {
                auth ?

                    <ul className="nav-ul">
                        <li><Link to="/">List</Link></li>
                        <li><Link to="/add">Add</Link></li>
                        <li><Link to="/profile">About</Link></li>
                        <li> <Link onClick={logout} to="/signup">Logout ({ JSON.parse(auth).name})</Link></li>
                    </ul>
                    :
                    <ul className="">
                        
                    </ul>
            }


        </div>
    )
}

export default Nav;