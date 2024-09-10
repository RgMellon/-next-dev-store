import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import Image from 'next/image'
import Link from 'next/link'

async function getFeaturedProducts(): Promise<Product[]> {
  const res = await api('/products/featured')
  return await res.json()
}

export default async function Home() {
  const [highlightProduct, ...otherProducts] = await getFeaturedProducts()

  console.log(highlightProduct, otherProducts)
  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={'/'}
        className="col-span-6 group row-span-6 relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={highlightProduct.image}
          alt=""
          width={860}
          height={860}
          className="group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-6">
          <span className="text-sm truncate">{highlightProduct.title} </span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => (
        <Link
          key={product.id}
          href={'/'}
          className="col-span-3 group row-span-3 rounded-lg relative bg-zinc-900 overflow-hidden flex justify-center items-end"
        >
          <Image
            src="/moletom-java.png"
            alt=""
            width={860}
            height={860}
            className="group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute bottom-10 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-6">
            <span className="text-sm truncate">{product.title} </span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
