// context/KeyContext.tsx

"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';

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
  }, []);

  return (
    <KeyContext.Provider
      value={{ publicKey, privateKey, serverPublicKey, sharedKey, jwt, role, setPublicKey, setPrivateKey, setServerPublicKey, setSharedKey, setJwt, setRole }}
    >
      {children}
    </KeyContext.Provider>
  );
};
