import { useNavigate } from "react-router-dom";
// import { createContext } from 'react';

import React, { createContext, useEffect, useMemo, useState } from "react";
import { User } from "@firebase/auth";
import { UserInfo, UserMetadata } from "firebase/auth";

export type UserContextState = {
  user?:
    | {
        email?: string;
        emailVerified?: boolean;
        isAnonymous?: boolean;
        metadata?: UserMetadata;
        providerData?: UserInfo[];
        refreshToken?: string;
        tenantId?: string | null;
      }
    | undefined;
  signUserIn: (signedUser: any) => void;
};

export const contextDefaultValues: UserContextState = {
  user: {
    emailVerified: false,
    isAnonymous: false,
    metadata: {
      creationTime: "",
      lastSignInTime: "",
    },
    providerData: [],
    refreshToken: "",
    tenantId: null,
  },
  signUserIn: (signedUser: any) => {},
};
export const UserAuthContext =
  createContext<UserContextState>(contextDefaultValues);

interface UserContextProps {}

const UserContext: React.FC<UserContextProps> = ({ children }) => {
  let navigate = useNavigate();
  const [user, setUser] = useState(contextDefaultValues.user);
  const signUserIn = (signedUser: any) => setUser(signedUser);
  const providerValue: React.SetStateAction<UserContextState> = useMemo(
    () => ({ user, signUserIn }),
    [user],
  );

  useEffect(() => {
    const checkLogin = () => {
      if (!user?.email) {
        return navigate("/login");
      }
    };
    checkLogin();
  }, []);
  return (
    <UserAuthContext.Provider value={providerValue}>
      {children}
    </UserAuthContext.Provider>
  );
};
export default UserContext;
