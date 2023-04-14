import { ReactNode, useState, useMemo } from "react";
import {  AppContext } from ".";
import MyContextData from "@/interfaces/MyContextData.interface";

interface IProps {
  children: ReactNode
}

export const AppContextProvider = ({ children }: IProps) => {

  const teste = [{
    title: 'Tênis Feminino Caminhada Ultrabone Leve + Relógio - Preto',
    category: 'Running',
    image: 'https://static.netshoes.com.br/produtos/tenis-feminino-caminhada-ultrabone-leve-relogio/06/POH-0045-006/POH-0045-006_zoom1.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    price: 99.90,
    link: 'https://www.netshoes.com.br/tenis-feminino-caminhada-ultrabone-leve--relogio-preto-POH-0045-006',
  },
  {
    title: 'Tênis Ultraboost 22 W Adidas - Preto',
    category: 'Running',
    image: 'https://static.netshoes.com.br/produtos/tenisultraboost-22-w-adidas/06/3ZP-5581-006/3ZP-5581-006_zoom1.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    price: 1199.90,
    link: 'https://www.netshoes.com.br/tenis-ultraboost-22-w-adidas-preto-3ZP-5581-006',
  }
]

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('todas')
  const [selectedCategory, setSelectedCategory] = useState('Categorias')
  const [products, setProducts] = useState(teste);

  const context: MyContextData = {
    searchTerm,
    selectedCategory,
    selectedPlatform,
    setSearchTerm,
    setSelectedCategory,
    setSelectedPlatform,
    products,
    setProducts,
  };

  return <AppContext.Provider value={context}>
          {children}
         </AppContext.Provider>
}