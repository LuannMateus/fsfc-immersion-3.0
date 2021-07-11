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
import { useForm } from 'react-hook-form';
import { CreditCard } from '../../../models/CreditCard';
import { useRouter } from 'next/dist/client/router';
import { useSnackbar } from 'notistack';

interface OrderPageProps {
  product: Product;
}

const Order: NextPage<OrderPageProps> = ({ product }) => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: CreditCard): Promise<void> => {
    try {
      const { data: order } = await useAxios.post('orders', {
        credit_card: data,
        items: [{ product_id: product.id, quantity: 1 }],
      });
      router.push(`/orders/${order.id}`);
    } catch (error) {
      console.error(axios.isAxiosError(error) ? error.response?.data : error);
      enqueueSnackbar('Erro ao realizar a sua compra.', {
        variant: 'error',
      });
    }
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="Nome"
              fullWidth
              required
              {...register('name')}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="Número do cartão"
              inputProps={{ maxLength: 16 }}
              fullWidth
              required
              {...register('number')}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              label="CVV"
              fullWidth
              required
              {...register('cvv')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  {...register('expiration_month')}
                  type="number"
                  label="Expiração mês"
                  fullWidth
                  required
                  onChange={(e) =>
                    setValue('expiration_month', parseInt(e.target.value))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('expiration_year')}
                  type="number"
                  label="Experição ano"
                  fullWidth
                  required
                  onChange={(e) =>
                    setValue('expiration_year', parseInt(e.target.value))
                  }
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
