import { NavLink } from 'react-router-dom'
import { Auth, Hub } from 'aws-amplify'
import { useState, useEffect } from 'react';
import './NavBar.css'


function NavBar() {

    const [user, setUser] = useState(null);
    async function logout() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    useEffect(() => {
        let updateUser = async authState => {
          try {
            let user = await Auth.currentAuthenticatedUser()
            console.log(user)
            setUser(user)
          } catch {
            setUser(null)
          }
        }
        Hub.listen('auth', updateUser) // listen for login/signup events
        updateUser() // check manually the first time because we won't get a Hub event
        return // cleanup
      }, []);

  return (
    <nav>
        <ul>
            <li>
                <NavLink to="/">Posts</NavLink>
            </li>
            <li>
            <NavLink to="/art">Art</NavLink>
            </li>
            <li>
            <NavLink to="/edit-art">Edit Art</NavLink>
            </li>
            <li>
            <NavLink to="/paint">Paint</NavLink>
            </li>
            <li>
                <NavLink to="new-post">New Post</NavLink>
            </li>
            {user && 
            <li>
                <span onClick={logout} id="logout">{user.username} Logout</span>
            </li>
            }
            {user && 
            <li>
            <NavLink to="/profile">Profile</NavLink>
            </li>
            }


            {!user &&
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>}
            {!user &&
            <li>
                <NavLink to="/signup">Signup</NavLink>
            </li>
            }   
            


        </ul>
    </nav>
  )
}
export default NavBar