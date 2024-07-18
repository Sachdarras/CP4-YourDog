import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const decodeToken = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rolesId, setRolesId] = useState(null);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      const decodedToken = decodeToken(token);

      if (decodedToken) {
        setIsAuthenticated(true);
        const id = decodedToken.rolesId;
        setRolesId(id);
      }
    }
  }, []);

  const login = (token) => {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      Cookies.set("auth_token", token, { secure: true, sameSite: "strict" });
      setIsAuthenticated(true);
      const id = decodedToken.rolesId;
      setRolesId(id);
    }
  };

  const logout = () => {
    Cookies.remove("auth_token");
    setIsAuthenticated(false);
    setRolesId(null);
  };

  const isAdmin = () => rolesId === 1;

  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      rolesId,
      isAdmin,
      login,
      logout,
    }),
    [isAuthenticated, rolesId]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
