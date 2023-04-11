import Image from 'next/image'
import { Inter } from 'next/font/google'
import Card from '@/components/Card'
import SearchBar from '@/components/SearchBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const teste = [{
    id: 1,
    name: 'Tênis Feminino Caminhada Ultrabone Leve + Relógio - Preto',
    category: 'Running',
    image: 'https://static.netshoes.com.br/produtos/tenis-feminino-caminhada-ultrabone-leve-relogio/06/POH-0045-006/POH-0045-006_zoom1.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    price: 99.90,
    link: 'https://www.netshoes.com.br/tenis-feminino-caminhada-ultrabone-leve--relogio-preto-POH-0045-006',
  },
  {
    id: 2,
    name: 'Tênis Ultraboost 22 W Adidas - Preto',
    category: 'Running',
    image: 'https://static.netshoes.com.br/produtos/tenisultraboost-22-w-adidas/06/3ZP-5581-006/3ZP-5581-006_zoom1.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    price: 1199.90,
    link: 'https://www.netshoes.com.br/tenis-ultraboost-22-w-adidas-preto-3ZP-5581-006',
  }
]

const categories = teste.map(({category}) => category);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchBar categories={categories}/>
      {teste.map((product) => <Card key={product.id} product={product} />)}
    </main>
  )
}
