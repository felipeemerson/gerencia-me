import { createContext, useState, useEffect, useContext } from "react";
import { doLogin } from "../api/auth";
import { createUser } from "../api/users";

const AuthContext = createContext({
    accessToken: undefined,
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    createUserAndDoLogin: () => {}
});

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);


    useEffect(() => {
    const storagedToken = localStorage.getItem('accessToken');

    if (storagedToken) {
        setAccessToken(storagedToken);
    }
    }, []);

    async function login(credentials) {
        await doLogin(credentials)
            .then(token => {
                setAccessToken(token);
                localStorage.setItem('accessToken', token);
            })
            .catch(error => console.log('Erro no login: ', error));
    }

    function logout() {
        setAccessToken(null);
        localStorage.removeItem('accessToken');
    }

    async function createUserAndDoLogin(user) {
        await createUser(user)
            .then(({ token }) => {
                setAccessToken(token);
                localStorage.setItem('accessToken', token);
            })
            .catch(error => console.log('Erro no cadastro: ', error));
    }

    return (
        <AuthContext.Provider
          value={{ isLoggedIn: Boolean(accessToken), accessToken, login, logout, createUserAndDoLogin }}
        >
          {children}
        </AuthContext.Provider>
      );
}

export function useAuth() {
    const context = useContext(AuthContext);
  
    return context;
  }