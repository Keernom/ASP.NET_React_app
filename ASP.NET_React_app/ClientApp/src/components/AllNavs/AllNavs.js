import { ALLPOSTS_URL, isUserOnline, PROFILE_URL } from "../../services/commonService";
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { LOGIN_URL, SEARCH_URL } from '../../services/commonService';
import { Link } from 'react-router-dom';
import style from './AllNavs.module.css'


const AllNavs = () => {
    let navs = [
        <NavItem>
            <NavLink tag={Link} className={style.navLink} to="/">Home</NavLink>
        </NavItem>
    ];

    if (isUserOnline()) {
        navs.push(
            <NavItem>
                <NavLink tag={Link} className={style.navLink} to={SEARCH_URL}>Search</NavLink>
            </NavItem>);
        navs.push(
            <NavItem>
                <NavLink tag={Link} className={style.navLink} to={ALLPOSTS_URL}>Wall</NavLink>
            </NavItem>);
        navs.push(
            <NavItem>
                <NavLink tag={Link} className={style.navLink} to={PROFILE_URL}>My Profile</NavLink>
            </NavItem>);
    }
    else {
        navs.push(
            <NavItem>
                <NavLink tag={Link} className={style.navLink} to={LOGIN_URL}>Login</NavLink>
            </NavItem>);
    }

    return (
        <ul className="navbar-nav flex-grow">
            {navs}
        </ul>
    )
}

export default AllNavs;