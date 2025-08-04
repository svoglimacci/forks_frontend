import Keycloak from "keycloak-js";
import { useEffect, useRef, useState } from "react";
import { setAuthToken } from "../../utils/customFetch";
import { AuthContext, type User } from "./authContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const initializationRef = useRef<boolean>(false);

  const login = async () => {
    if (keycloak && !authenticated) {
      try {
        await keycloak.login();
      } catch (error) {
        console.error("Login failed", error);
      }
    }
  };

  const logout = async () => {
    if (keycloak && authenticated) {
      try {
        await keycloak.logout();
      } catch (error) {
        console.error("Logout failed", error);
      }
    }
  };

  const updateToken = async (minValidity: number = 30) => {
    if (keycloak && authenticated) {
      try {
        const refreshed = await keycloak.updateToken(minValidity);
        if (refreshed) {
          console.log("Token refreshed successfully");
          setAuthToken(keycloak.token || null);
        } else {
          console.log("Token is still valid");
        }
        return refreshed;
      } catch (error) {
        console.error("Token refresh failed", error);
        keycloak.logout();
        throw error;
      }
    }
    return false;
  };

  useEffect(() => {
    if (initializationRef.current) {
      console.log("Keycloak already initialized, skipping...");
      return;
    }

    console.log("Starting Keycloak initialization...");
    initializationRef.current = true;

    const keycloakConfig = {
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    };

    console.log("Keycloak config:", keycloakConfig);

    const keycloakInstance = new Keycloak(keycloakConfig);

    keycloakInstance
      .init({
        enableLogging: true,
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      })
      .then((auth) => {
        console.log("Keycloak initialized successfully. Authenticated:", auth);
        setKeycloak(keycloakInstance);
        setIsLoading(false);
        setAuthenticated(auth);
        setAuthToken(keycloakInstance.token || null);

        if (auth && keycloakInstance.tokenParsed) {
          setUser({
            id: keycloakInstance.tokenParsed.sub || "",
            email: keycloakInstance.tokenParsed.email || "",
          });
        }
      })
      .catch((error) => {
        console.error("Keycloak initialization failed:", error);
        setIsLoading(false);
        initializationRef.current = false;
      });

    return () => {};
  }, []);

  useEffect(() => {
    if (keycloak) {
      setAuthToken(keycloak.token || null);
    }
  }, [keycloak?.token]);

  useEffect(() => {
    if (keycloak && authenticated) {
      const interval = setInterval(async () => {
        try {
          await updateToken(60);
        } catch (error) {
          console.error("Automatic token refresh failed:", error);
        }
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [keycloak, authenticated]);

  return (
    <AuthContext.Provider
      value={{
        keycloak,
        authenticated,
        user,
        isLoading,
        login,
        logout,
        updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
