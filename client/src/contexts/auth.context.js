import { createContext, useState, useEffect, useContext } from "react";
import { doLogin } from "../api/auth";
import { createUser } from "../api/users";

const AuthContext = createContext({
    accessToken: undefined,
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    createUserAndDoLogin: () => {},
    isLoginError: false,
    isSignUpError: false,
    loginError: undefined,
    signUpError: undefined
});

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [isLoginError, setIsLoginError] = useState(false);
    const [isSignUpError, setIsSignUpError] = useState(false);
    const [loginError, setLoginError] = useState(undefined);
    const [signUpError, setSignUpError] = useState(undefined);

    useEffect(() => {
        const storagedToken = localStorage.getItem('accessToken');

        if (storagedToken) {
            setAccessToken(storagedToken);
    }
    }, []);

    async function login(credentials) {
        await doLogin(credentials)
            .then(({ data: token }) => {
                setAccessToken(token);
                localStorage.setItem('accessToken', token);
            })
            .catch((err) => {
                setIsLoginError(true);
                setLoginError(err.response.data);
            });
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
            .catch(err => {
                setIsSignUpError(true);
                setSignUpError(err.response.data);
            });
    }

    return (
        <AuthContext.Provider
            value={{
              isLoggedIn: Boolean(accessToken),
              accessToken,
              login,
              logout,
              createUserAndDoLogin,
              isLoginError,
              isSignUpError,
              loginError,
              signUpError
            }}
        >
          {children}
        </AuthContext.Provider>
      );
}

export function useAuth() {
    const context = useContext(AuthContext);
  
    return context;
  }