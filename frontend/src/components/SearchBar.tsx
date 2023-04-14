import React, { FC, useCallback, useContext } from 'react';
import { useAppContext } from '@/context/hook';
import { requestWebScrap } from '@/services/api';
interface Props {
  categories: string[];
};

const SearchBar: FC<Props> = ({ categories }) => {

  const {
    searchTerm,
    setSearchTerm,
    selectedPlatform,
    setSelectedPlatform,
    selectedCategory,
    setSelectedCategory,
    setProducts
  } = useAppContext();

  const handleSearch = useCallback( async () => {
  setProducts([]);
  const response =  await requestWebScrap(searchTerm, selectedCategory.toLowerCase(), selectedPlatform)
  setProducts(response)
  }, [searchTerm, selectedCategory, selectedPlatform, setProducts]);

  return (
    <div className="flex justify-center p-4">
      <select
        className="bg-gray-200 rounded-md py-2 px-4 mr-2 text-black"
        value={selectedPlatform}
        onChange={(e) => setSelectedPlatform(e.target.value)}
      >
        <option value="Todas">Todas</option>
        <option value="Mercado Livre">Mercado Livre</option>
        <option value="Buscapé">Buscapé</option>
      </select>

      <select
        className="bg-gray-200 rounded-md py-2 px-4 mr-2 text-black"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory((e.target.value))}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="bg-gray-200 rounded-md py-2 px-4 mr-2 text-black"
        placeholder="Digite sua busca..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white rounded-md py-2 px-4"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;