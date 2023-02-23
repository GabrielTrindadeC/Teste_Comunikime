import { useAuthStore } from "../../store/auth"
import { useOrderStore } from "../../store/order"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Button, Container, Paper } from "@mui/material";
import { formatterMoney } from "../../utils/money";
import { HeaderMenu } from "../../components/headerMenu";
import { axios } from "../../api/axios";
export function Order() {
  const data = useOrderStore(state => state.itemOrder)
  const authToken = useAuthStore(state => state.authToken)
  const user = useAuthStore(state => state.userData)
  const [sucess, setSucess] = React.useState<boolean>(false)
  const handlePurchase = async () => {
    const body = {
      userId: user?.user.id as number,
      productsId: [data?.id]
    }
    try {
      await axios.post('purchases/', body, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      setSucess(true)
    } catch (error) {
      console.log(error)
    }
  }
  const products = [
    {
      name: data?.name,
      desc: data?.description,
      price: formatterMoney.format(Number(data?.price)),
    },
    { name: 'Shipping', desc: '', price: 'Free' },
  ];
  const addresses = [user?.user.address];

  return (
    <>
      {sucess ? (
        <>
          <HeaderMenu />
          <Typography variant="h5" gutterBottom>
            Obrigado pela compra!
          </Typography>
          <Typography variant="subtitle1">
            Seu pedido sera enviado em breve
          </Typography>
        </>
      ) : (<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {products.map((product) => (
                <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={product.name} secondary={product.desc} />
                  <Typography variant="body2">{product.price}</Typography>
                </ListItem>
              ))}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {formatterMoney.format(Number(data?.price))}
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Shipping
                </Typography>
                <Typography gutterBottom>{user?.user.name}</Typography>
                <Typography gutterBottom>{addresses.join(', ')}</Typography>
              </Grid>
              <Grid item container direction="column" xs={12} sm={6}>
                <Button variant="contained" onClick={handlePurchase}>Finalizar Compra</Button>
              </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
      </Container>)}

    </>
  )

}