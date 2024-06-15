"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'next/navigation'; // Import useRouter

interface KeyContextType {
  publicKey: string | null;
  privateKey: string | null;
  serverPublicKey: string | null;
  sharedKey: string | null;
  jwt: string | null;
  role: string | null;
  setPublicKey: (key: string | null) => void;
  setPrivateKey: (key: string | null) => void;
  setServerPublicKey: (key: string | null) => void;
  setSharedKey: (key: string | null) => void;
  setJwt: (token: string | null) => void;
  setRole: (role: string | null) => void;
}

const KeyContext = createContext<KeyContextType>({
  publicKey: null,
  privateKey: null,
  serverPublicKey: null,
  sharedKey: null,
  jwt: null,
  role: null,
  setPublicKey: () => {},
  setPrivateKey: () => {},
  setServerPublicKey: () => {},
  setSharedKey: () => {},
  setJwt: () => {},
  setRole: () => {},
});

export const useKeyContext = () => useContext(KeyContext);

export const KeyProvider = ({ children }: { children: ReactNode }) => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [serverPublicKey, setServerPublicKey] = useState<string | null>(null);
  const [sharedKey, setSharedKey] = useState<string | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter(); // Initialize router

  const handleLogout = useCallback(() => {
    setJwt(null);
    setRole(null);
    setSharedKey(null);
    setServerPublicKey(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('sharedKey');
    router.push("/"); // Redirect to login page
  }, [router]);

  useEffect(() => {
    const storedJwt = localStorage.getItem('jwt');
    const storedSharedKey = localStorage.getItem('sharedKey');
    if (storedJwt) {
      setJwt(storedJwt);
      const decodedToken: any = jwtDecode(storedJwt);
      setRole(decodedToken.role);
    }
    if (storedSharedKey) {
      setSharedKey(storedSharedKey);
    }

    const checkSession = () => {
      if (storedJwt) {
        const decodedToken: any = jwtDecode(storedJwt);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          handleLogout();
        }
      }
    };

    const interval = setInterval(checkSession, 1 * 60 * 1000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, [handleLogout]);

  return (
    <KeyContext.Provider
      value={{ publicKey, privateKey, serverPublicKey, sharedKey, jwt, role, setPublicKey, setPrivateKey, setServerPublicKey, setSharedKey, setJwt, setRole }}
    >
      {children}
    </KeyContext.Provider>
  );
};
