// import { createContext } from 'react';

import React, { createContext, useMemo, useState } from 'react';
import { User } from '@firebase/auth';
import { UserInfo, UserMetadata } from 'firebase/auth';

export type UserContextState = {
  user?:
    | {
        email?: string ;
        emailVerified?: boolean;
        isAnonymous?: boolean;
        metadata?: UserMetadata;
        providerData?: UserInfo[];
        refreshToken?: string;
        tenantId?: string | null;
      }
    | undefined;
  signUserIn: (signedUser: any) => void;
  // user:object;
  // signUserIn: (signedUser: any) => void;
};

export const contextDefaultValues: UserContextState = {
  user: {
    emailVerified: false,
    isAnonymous: false,
    metadata: {
      creationTime: '',
      lastSignInTime: '',
    },
    providerData: [],
    refreshToken: '',
    tenantId: null,
  },
  signUserIn: (signedUser: any) => {},

  // user:{},
  // signUserIn: (signedUser: any) => {}
};
export const UserAuthContext = createContext<UserContextState>(contextDefaultValues);

interface UserContextProps {}

const UserContext: React.FC<UserContextProps> = ({ children }) => {
  const [ user, setUser ] = useState(contextDefaultValues.user);
  const signUserIn = (signedUser: any) => setUser(signedUser);
  const providerValue: React.SetStateAction<UserContextState> = useMemo(() => ({ user, signUserIn }), [ user ]);

  return <UserAuthContext.Provider value={providerValue}>{children}</UserAuthContext.Provider>;
};
export default UserContext;
