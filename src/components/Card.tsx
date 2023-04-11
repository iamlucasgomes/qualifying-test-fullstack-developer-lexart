import Image from "next/image";
import Link from "next/link";
import React from "react";

type Product = {
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

export default function Card({ product }: Props) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {product.category}
          </div>
          <Link href={`/products/${product.id}`}>
            <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {product.name}
            </a>
          </Link>
          <p className="mt-2 text-gray-500">{product.description}</p>
          <p className="mt-2 text-gray-500">${product.price.toFixed(2)}</p>
          <Link href={product.link}>
            <a className="mt-5 inline-block px-4 py-2 leading-none border rounded text-white bg-indigo-500 hover:bg-indigo-600">
              Ir a web
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

