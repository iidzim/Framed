import React from "react";

export interface IUserData {
  id: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

type State = {
  user: IUserData | null;
  isAuthenticated: boolean;
  logout: () => void;
  login: (user: any) => void; //tmp
};

type Action = {
  type: string;
  payload: any;
};

const initialState = {
  user: {
    id: "",
    username: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
    createdAt: "",
    updatedAt: "",
  },

  isAuthenticated: false,
  logout: () => {},
  login: () => {},
};
export const UserContext = React.createContext(initialState);

const sampleUser = {
  username: "joe",
  firstName: "Joe",
  lastName: "Doe",
  avatarUrl:
    "/assets/images/Aaron_Swartz_at_Boston_Wikipedia_Meetup_2009-08-18.jpg",
};

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

interface ContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(
    userReducer,
    initialState
  );

  const login = () => {
    dispatch({ type: "LOGIN", payload: sampleUser });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT", payload: null });
  };

  const value = React.useMemo(
    () => ({
      ...state,
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      logout,
      login,
    }),
    [state]
  ); // eslint-disable-line react-hooks/exhaustive-deps

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
