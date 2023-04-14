import Card from '@/components/Card'
import SearchBar from '@/components/SearchBar'
import { useAppContext } from '@/context/hook';
import { requestWebScrap } from '@/services/api';
import { useEffect, useMemo, useState } from 'react';

export default function Main() {
  const {setSelectedCategory, searchTerm, selectedCategory, selectedPlatform, products} = useAppContext();
 
  // useEffect(() => {
  //   (async () => {
  //     const products = await requestWebScrap(searchTerm, selectedCategory, selectedPlatform)
  //     setProducts(products);
  //   })()
  // }, [searchTerm, selectedCategory, selectedPlatform]) 



const categories = useMemo(() => ['Celular', 'Geladeira'], []);

useEffect(() => {
  setSelectedCategory(categories[0].toLowerCase())
},[ categories, setSelectedCategory])

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SearchBar categories={categories}/>
        {products.map((product) => <Card key={product.title} product={product} />)}
      </main>
  )
}
