import { ReactNode, useState, useMemo, useCallback } from "react";
import {  AppContext } from ".";
import MyContextData from "@/interfaces/MyContextData.interface";
import {requestWebScrap} from '../services/api'

interface IProps {
  children: ReactNode
}

export const AppContextProvider = ({ children }: IProps) => {

const [searchTerm, setSearchTerm] = useState('')
const [selectedPlatform, setSelectedPlatform] = useState('todas')
const [selectedCategory, setSelectedCategory] = useState('Celular')
const [products, setProducts] = useState([]);
const [haveProducts, setHaveProducts] = useState(false);
const [isLoading, setIsLoading] = useState(false);

  const context: MyContextData = {
    searchTerm,
    selectedCategory,
    selectedPlatform,
    setSearchTerm,
    setSelectedCategory,
    setSelectedPlatform,
    products,
    setProducts,
    haveProducts,
    setHaveProducts,
    isLoading,
    setIsLoading,
  };

  return <AppContext.Provider value={context}>
          {children}
         </AppContext.Provider>
}