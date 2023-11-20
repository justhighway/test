import React, { useContext, createContext, useState } from "react";

const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider
      children={children}
      value={{
        user: user,
        setUser: setUser,
      }}
    />
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext.Provider is not found");
  }
  return userContext;
}
