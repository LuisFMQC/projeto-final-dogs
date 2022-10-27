import { getSuggestedQuery } from '@testing-library/react';
import React from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
    const [data , setData] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    

    

    async function getUser(token) {
        const {url, options} = USER_GET(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
        setLogin(true);
    }

    async function userLogin(username, password) {
      try {
        setError(null);
        setLoading(true);
        const {url, options} = TOKEN_POST({username, password});
        const tokenRes = await fetch(url, options);
        const {token, message} = await tokenRes.json();
        if(!tokenRes.ok) throw new Error(`Error: ${message}`);
        window.localStorage.setItem('token', token);
        await getUser(token);
        navigate('/conta');
      } catch (err) {
        setError(err.message);
        console.log(err.message)
        setLogin(false);
      } finally {
        setLoading(false);
      }
    } 
    
    const userLogout = React.useCallback(async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    }, [navigate])

    React.useEffect(() => {
      async function autologin() {
        const token = window.localStorage.getItem('token');
        if(token) {
          try {
            setError(null);
            setLoading(true);
            const {url, options} = TOKEN_VALIDATE_POST(token);
            const response = await fetch(url, options);
            if(!response.ok) throw new Error('Token Inválido');
            await getUser(token);
          } catch (err) {
              userLogout();
          } finally {
              setLoading(false);
        }
      }  
    }
    autologin();
  }, [userLogout])

  return (
    <UserContext.Provider value={{ error, loading, login, data, userLogout, userLogin }}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContext