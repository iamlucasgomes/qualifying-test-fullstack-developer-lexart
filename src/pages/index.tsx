import Image from 'next/image'
import { Inter } from 'next/font/google'
import Card from '@/components/Card'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const teste = [{
    id: 1,
    name: 'Tênis Feminino Caminhada Ultrabone Leve + Relógio - Preto',
    category: 'Running',
    image: 'https://static.netshoes.com.br/produtos/tenis-feminino-caminhada-ultrabone-leve-relogio/06/POH-0045-006/POH-0045-006_zoom1.jpg',
    description: 'Tênis Feminino Caminhada Ultrabone + RELÓGIO DIGITAL Com design jovem, este tênis pode ser usado em qualquer ocasião: caminhada, corrida, academia, trabalho ou passeio. Suas principais características são: leveza, maciez, conforto e estilo. Temos todas às cores e numerações do anuncio disponíveis para envio imediato. A forma do tênis é padrão. Por exemplo se usa 36 sugiro que pegue o 36! Você também pode usar a tabela de medidas abaixo. Tamanhos / Comprimento em centímetros 34 – 23,0 cm 35 – 23,7 cm 36- 24,3 cm 37 - 25,0 cm 38 - 25,7 cm 39 - 26,3 cm 40 – 27,0 cm 41 - 27,5 cm 42 - 28,5 cm 43 - 29,0 cm ******* COMO MEDIR? Para medir o tamanho do seu pé, pise descalço em uma folha de papel, colocando o calcanhar na parede. Faça uma marca com caneta no seu dedo mais longo e meça a distância (COMPRIMENTO) entre e a marcação desse dedo mais longo e a parte da folha que encostou na parede junto de seu calcanhar e compare com nossa tabela de medidas demonstrada acima. O TÊNIS É CONFORTÁVEL? Sim, sua principal característica é o conforto! Ideal para fazer exercícios como academia, corrida, caminhada. Caso não goste você pode devolver o tênis e ser reembolsada(o)!',
    price: 99.90,
    link: 'https://www.netshoes.com.br/tenis-feminino-caminhada-ultrabone-leve--relogio-preto-POH-0045-006',
  }]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {teste.map((product) => <Card key={product.id} product={product} />)}
    </main>
  )
}
