import Image from "next/image";
import Link from "next/link";
import React, {FC} from "react";

interface Product {
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  id: number;
  link: string;
};

type Props = {
  product: Product;
};

const Card: FC<Props> = ({ product }: Props) => {
  return (
    <div className="m-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            className="h-48 w-full object-cover md:w-48"
            width={415}
            height={397}
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="p-8">
          <title
            className="block mt-1 text-lg leading-tight font-medium text-black">
            {product.name}
          </title>
          <p className="mt-2 text-gray-500">{product.description}</p>
          <p className="mt-2 text-gray-500">${product.price.toFixed(2)}</p>
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
