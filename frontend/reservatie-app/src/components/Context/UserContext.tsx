import { createContext } from "react";
import { IUser } from "../../types";

const propUser: IUser = {
    id: "noUser",
    firstName: "null",
    lastName: "null",
    isAdmin: false,
    email: "null",
    languageUse: "null",
    hasAssingedSeat: false,
}

export const UserContext = createContext({user: propUser, setUser: (user: IUser) => {}});