import { Route } from "react-router-dom";

import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../contexts/auth";


/* Private router para so liberar o acesso a rota expecífica se o usuário
estiver autenticado */
export default function PrivateRoute({
  component: Component,
  isPrivate,
  ...rest
}) {


    const history = useHistory();

    const { login, logout, userToken } = useContext(AuthContext);
    console.log("USER TOKEN", userToken);
    
    const newValor = userToken
    console.log("NEW VALOR", newValor);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const tokenValited = localStorage.getItem("tokenValited");
        console.log("TOKEN", token);
        console.log("TOKEN VALITED", tokenValited);
      if (token === tokenValited) {
        login();
        history.push("/dashboard");
      } else {
        logout();
        history.push("/");
      }
    }, [login, history, logout]);

// const { userToken, isAuthenticated } = useContext(AuthContext);

// const history = useHistory();

// console.log("USER TOKEN", userToken);
// useEffect(() => {
  
//     if(!isAuthenticated && isPrivate){
//         return history.push("/")
//       }
    
//       if(isAuthenticated && !isPrivate){
//         return history.push("/dashboard")
//       }

    
// }, [isAuthenticated, history, isPrivate]);

  

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}


