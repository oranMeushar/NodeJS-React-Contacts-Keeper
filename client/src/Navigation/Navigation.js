import React, {useEffect} from 'react';
import './Navigation.css';
import Logo from '../Logo/Logo';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import logoutImg from '../assets/logout.ico';
const Navigation = (props) =>{

    useEffect(() =>{
        const liList = [...document.querySelectorAll('.Nav li')];
        liList.forEach(li => {
            li.addEventListener('click',(e)=>{
                liList.forEach(li => {
                    li.classList.remove('active');
                });
                    e.target.parentElement.classList.add('active');
            })
        })
    },[]);
    return(
        <nav className="Nav">
            <div className="Nav-logo">
                <Link to='/'><Logo/></Link>
                <span>Contact Keeper</span>
            </div>
            
            <ul>
                {props.token?null:<li><NavLink to='/register'>Register</NavLink></li>}
                {props.token?null:<li><NavLink to='/login'>Login</NavLink></li>}
                {props.token?<li className="logout-img">Logout<NavLink to='/logout'><img src={logoutImg} alt="logoutimg"/></NavLink></li>:null}
            </ul>
        </nav>
    )
}

const mapStateToProps = (state) =>{
    return{
        token:state.auth.token
    }
}

export default connect(mapStateToProps)(Navigation);