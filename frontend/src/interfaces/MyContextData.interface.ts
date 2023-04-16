import React from "react";
import Product from "./Product.interface";

export default interface MyContextData{
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedPlatform: string;
  setSelectedPlatform: React.Dispatch<React.SetStateAction<string>>;
  products: Product[] | [];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>> | React.Dispatch<React.SetStateAction<never[]>>;
  haveProducts: boolean;
  setHaveProducts: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}