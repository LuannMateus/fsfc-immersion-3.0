import { CardHeader } from '@material-ui/core';
import Link from 'next/link';

import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useAxios } from '../../../hooks/useAxios';

import { Product } from '../../../models/Product';

const product: Product[] = [
  {
    id: 'uuid',
    name: 'produto teste',
    description: 'muito caro texto',
    price: 50.5,
    image_url: 'https://source.unsplash.com/random?product',
    slug: 'produto-teste',
    created_at: '2021-06-06T00:00',
  },
];

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  return (
    <div>
      <Head>
        <title> {product.name} | Product Details</title>
      </Head>
      <Card>
        <CardHeader
          title={product.name.toUpperCase()}
          subheader={`R$ ${product.price}`}
        />
        <CardActions>
          <Link
            href="/products/[slug]/order"
            as={`/products/${product.slug}/order`}
            passHref
          >
            <Button size="small" color="primary" component="a">
              Comprar
            </Button>
          </Link>
        </CardActions>
        <CardMedia style={{ paddingTop: '56%' }} image={product.image_url} />
        <CardContent>
          <Typography color="textSecondary" variant="body2" component="p">
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailPage;

export const getStaticProps: GetStaticProps<ProductDetailPageProps> = async (
  context
) => {
  const { slug } = context.params!;

  try {
    const { data: product } = await useAxios.get(`products/${slug}`);

    return {
      props: {
        product,
      },
      revalidate: 1 * 60 * 2,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { notFound: true };
    }

    throw error;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: products } = await useAxios.get('products');

  const paths = products.map((product: Product) => {
    return {
      params: { slug: product.slug },
    };
  });

  return { paths, fallback: 'blocking' };
};
