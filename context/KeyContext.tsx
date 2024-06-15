// context/KeyContext.tsx

"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  handleLogin: (newJwt: string) => void;
  handleLogout: () => void;
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
  handleLogin: () => {},
  handleLogout: () => {},
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
    if (storedJwt) {
      setJwt(storedJwt);
    }
  }, []);

  const handleLogin = (newJwt: string) => {
    localStorage.setItem('jwt', newJwt);
    setJwt(newJwt);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setJwt(null);
    setSharedKey(null);
    setRole(null);
  };

  return (
    <KeyContext.Provider
      value={{
        publicKey,
        privateKey,
        serverPublicKey,
        sharedKey,
        jwt,
        role,
        setPublicKey,
        setPrivateKey,
        setServerPublicKey,
        setSharedKey,
        setJwt,
        setRole,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </KeyContext.Provider>
  );
};
