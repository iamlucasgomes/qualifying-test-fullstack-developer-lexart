import Card from '@/components/Card'
import Image from "next/image";
import SearchBar from '@/components/SearchBar'
import { useAppContext } from '@/context/hook';
import { useEffect, useMemo, useState } from 'react';
import Loader from '@/components/Loader';

export default function Main() {
  const { setSelectedCategory, products, haveProducts, isLoading } = useAppContext();  
  const lexartLogo:string = 'lex-white.svg';
  const lexart:string = 'lexart-logo';
  const categories: string[] = useMemo(() => [
    'Celular',
    'Geladeira',
    'TV',
  ], []);

  useEffect(() => {
    setSelectedCategory(categories[0].toLowerCase())
  }, [categories, setSelectedCategory])

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div>
      <Image
            width={400}
            height={380}
            src={lexartLogo}
            alt={lexart}
          />
      </div>
      <SearchBar categories={categories} />
      {isLoading ? <Loader message='Buscando'/> : haveProducts
      ? products.map((product, i) => <Card key={`${product.title}:${i}`} product={product} />)
      : <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>Faça uma busca</h2>
        </div>}
    </main>
  )
}
