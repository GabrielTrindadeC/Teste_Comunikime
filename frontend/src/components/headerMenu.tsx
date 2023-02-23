import { Button } from "@mui/material";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

export function HeaderMenu() {
  const role = useAuthStore(state => state.userData?.user.role)
  const navigate = useNavigate()
  const handleLogout = () => {
    useAuthStore.persist.clearStorage()
    navigate('/login')
  };

  return (
    <header>
      <nav className="headerNav">
        <a className="headerA" href="/">
          <p className="headerLogo">TK</p>
        </a>
        <ul className="headerList">
          <li>
            <a className="headerA" href="/">Home</a>
          </li>
          <li>
            {role === 2 ? <a className="headerA" href="/admin">Admin</a> : ''}
          </li>
          <li>
            <Button variant="text" onClick={handleLogout}>Logout</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}