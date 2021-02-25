import React,{Suspense, useEffect} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Layout from './Layout/Layout';
import {connect} from 'react-redux';
import * as actions from './store/actions/auth';
import * as api from './util/api';

const Login = React.lazy(()=>import('./Login/Login'));
const Register = React.lazy(()=>import('./Register/Register'));
const Contacts = React.lazy(()=>import('./Contacts/Contacts'));
const Logout = React.lazy(()=>import('./Logout/Logout'));
const Home = React.lazy(()=>import('./Home/Home'));
const ForgotPassword = React.lazy(()=>import('./ForgotPassword/ForgotPassword'));
const ResetPassword = React.lazy(()=>import('./ResetPassword/ResetPassword'));


const App = (props) =>{
  useEffect(async()=>{
    const endPoint = 'auth/isAuth';
    const [result, data] = await api.get(endPoint);
    if (result.status === 200) {
      props.onAuthSuccess(data.token)
    }
  })

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/contacts' component={Contacts}/>
            <Route exact path='/logout' component={Logout}/>
            <Route exact path='/forgotPassword' component={ForgotPassword}/>
            <Route exact path='/ResetPassword/:resetToken' component={ResetPassword}/>
          </Switch>
        </Suspense>
      </Layout>
    </div>
    
  );
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onAuthSuccess:(token)=>dispatch(actions.onSuccess(token))
  }
}
export default connect(null, mapDispatchToProps)(App);
