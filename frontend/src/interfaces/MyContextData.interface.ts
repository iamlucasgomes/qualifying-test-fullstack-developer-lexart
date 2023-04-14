import Product from "./Product.interface";

export default interface MyContextData{
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedPlatform: string;
  setSelectedPlatform: React.Dispatch<React.SetStateAction<string>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}