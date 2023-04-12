import { ReactNode, useState, useMemo } from "react";
import { MyContextData, AppContext } from ".";

interface IProps {
  children: ReactNode
}

export const AppContextProvider = ({ children }: IProps) => {

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('todas')
  const [selectedCategory, setSelectedCategory] = useState('Categorias')

  const context: MyContextData = {
    searchTerm,
    selectedCategory,
    selectedPlatform,
    setSearchTerm,
    setSelectedCategory,
    setSelectedPlatform,
  };

  return <AppContext.Provider value={context}>
          {children}
         </AppContext.Provider>
}