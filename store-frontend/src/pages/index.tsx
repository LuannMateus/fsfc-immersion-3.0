import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from '@material-ui/core';
import Head from 'next/head';
import Link from 'next/link';
import { Product } from '../models/Product';

import style from '../../styles/Home.module.scss';
import { GetServerSideProps, NextPage } from 'next';
import { useAxios } from '../hooks/useAxios';

interface HomeProps {
  products: Product[];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  const renderProducts = () => {
    return products.map((product) => {
      return (
        <Grid key={product.id} item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              style={{ paddingTop: '56%' }}
              image={product.image_url}
            />
            <CardContent>
              <Typography component="h2" variant="h5" gutterBottom>
                {product.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                href="/products/[slug]"
                as={`/products/${product.slug}`}
                passHref
              >
                <Button size="small" color="primary" component="a">
                  Detalhes
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <>
      <Head>
        <title>Home | Store</title>
      </Head>
      <div className={style.container}>
        <Typography
          component="h1"
          variant="h3"
          color="textPrimary"
          gutterBottom
        >
          Produtos
        </Typography>
        <Grid container spacing={4}>
          {renderProducts()}
        </Grid>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: products } = await useAxios.get('products');

  return {
    props: {
      products,
    },
  };
};
