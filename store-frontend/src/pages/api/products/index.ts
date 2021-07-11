// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../models/Product';

const product: Product[] = [
  {
    id: 'uuid',
    name: 'produto teste',
    description: 'muito caro texto',
    price: 50.5,
    image_url: 'https://source.unsplash.com/random?product' + Math.random(),
    slug: 'produto-teste',
    created_at: '2021-06-06T00:00',
  },
  {
    id: 'uuid123',
    name: 'produto teste',
    description: 'muito caro texto',
    price: 50.5,
    image_url: 'https://source.unsplash.com/random?product' + Math.random(),
    slug: 'produto-teste',
    created_at: '2021-06-06T00:00',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(product);
}
