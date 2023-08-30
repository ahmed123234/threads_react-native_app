import { createContext, useContext } from "react";
import { UserProps } from "../lib/types";

export type GlobalContent = {
    modalVisible: boolean;
    setModalVisible: (m: boolean) => void;
    currentUser: UserProps;
    setCurrentUser: (x: UserProps) => void;
  }
  
  export const AppContext = createContext<GlobalContent>({
    modalVisible: false,
    setModalVisible: (_value: boolean) => {},
    currentUser: {} as UserProps,
    setCurrentUser: (_value: UserProps) => {}
  });
  
  export const useGlobalContext = () => useContext(AppContext);