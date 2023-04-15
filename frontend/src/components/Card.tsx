import Image from "next/image";
import Link from "next/link";
import React, {FC} from "react";
import Product from "@/interfaces/Product.interface";


interface Props {
  product: Product;
};

const Card: FC<Props> = ({ product }: Props) => {

const options = { style: 'currency', currency: 'BRL' };

  return (
    <div className="w-full h-38 m-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-3 md:flex-shrink-0">
          <Image
            className="w-48 h-48 object-contain"
            width={400}
            height={380}
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="p-8">
          <title
            className="block mt-1 text-lg leading-tight font-medium text-black">
            {product.title}
          </title>
          <p className="mt-2 text-gray-500">{product.meta}</p>
          <p className="mt-2 text-gray-500">{product.description}</p>
          <p className="mt-2 text-gray-500">{product.price.toLocaleString('pt-BR', options)}</p>
          <Link
            href={product.link}
            target="_blank"
            className="mt-5 inline-block px-4 py-2 leading-none border rounded text-white bg-indigo-500 hover:bg-indigo-600">
              Ir a web  
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
