import {
  Typography,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Avatar,
  TextField,
  Button,
  Grid,
  Box,
} from '@material-ui/core';

import axios from 'axios';

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { useAxios } from '../../../hooks/useAxios';

import { Product } from '../../../models/Product';

import styles from '../../../../styles/products/Order.module.scss';

interface OrderPageProps {
  product: Product;
}

const Order: NextPage<OrderPageProps> = ({ product }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title> Payment </title>
      </Head>
      <Typography component="h1" variant="h1">
        Checkout
      </Typography>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={product.image_url} />
        </ListItemAvatar>

        <ListItemText
          primary={product.name}
          secondary={`R$ ${product.price}`}
        />
      </ListItem>
      <Typography component="h2" variant="h6" gutterBottom>
        Page com o cartão de credito
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField type="text" label="Nome" fullWidth required />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="Número do cartão"
              inputProps={{ maxLength: 16 }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField type="number" label="CVV" fullWidth required />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  label="Expiração mês"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  label="Experição ano"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div className={styles.buttonBox}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Pagar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Order;

export const getServerSideProps: GetServerSideProps<OrderPageProps> = async (
  context
) => {
  const { slug } = context.params!;

  try {
    const { data: product } = await useAxios.get(`products/${slug}`);

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { notFound: true };
    }

    throw error;
  }
};
