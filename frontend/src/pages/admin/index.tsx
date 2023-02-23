import React, { useEffect, useState } from 'react'
import { HeaderMenu } from '../../components/headerMenu'
import { useAuthStore } from '../../store/auth'
import { ItensType } from '../Home/types'
import { axios } from '../../api/axios'
import { Box, Button, IconButton, List, ListItem, ListItemText, TextField } from '@mui/material'
type CategoryType = {

  id: number,
  name: string

}
export const Admin = () => {
  const authToken = useAuthStore(state => state.authToken)
  const [data, setData] = useState<ItensType[]>([])
  const [haveCategory, setHaveCategory] = useState<boolean>(false)
  const category = async () => {
    try {
      const response = await axios.get<CategoryType>('category/1', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      setHaveCategory(true)
    } catch (error: any) {
      if (error.response.data.statusCode) setHaveCategory(false)
    }
  }
  const getData = async () => {
    try {
      const response = await axios.get<ItensType[]>('products', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      setData(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newCategoria = {
      "name": data.get('categoria') as string
    }
    try {
      const response = await axios.post('category', newCategoria, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      setHaveCategory(true)
    } catch (err) {
      console.log(err)
    }

  };
  const handleSubmitProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get('name') as string,
      price: Number(data.get('price')),
      imgUrl: 'a',
      category: {
        id: 1
      },
      stock: Number(data.get('stock')),
      description: data.get('desc') as string
    }
    try {
      await axios.post('products', body, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      getData()
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    category()
    getData()
  }, [])
  return (
    <>
      <HeaderMenu />
      {
        !haveCategory && (
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <p>Criar UI</p>
            <TextField margin="normal"
              required
              fullWidth
              id="categoria"
              label="nome"
              name="categoria"
              autoComplete="categoria"
              autoFocus />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        )
      }
      {
        haveCategory && (
          <>
            <Box component="form" onSubmit={handleSubmitProduct} noValidate sx={{ mt: 1 }}>
              <p>Criar Produto</p>
              <TextField margin="normal"
                required
                fullWidth
                id="name"
                label="nome"
                name="name"
                autoComplete="name"
                autoFocus />
              <TextField margin="normal"
                required
                fullWidth
                id="price"
                type='number'
                label="Preço"
                name="price"
                autoComplete="price"
                autoFocus />
              <TextField margin="normal"
                required
                fullWidth
                id="stock"
                label="Estoque"
                type='number'
                name="stock"
                autoComplete="stock"
                autoFocus />
              <TextField margin="normal"
                required
                fullWidth
                id="desc"
                label="Descrição"
                name="desc"
                autoComplete="desc"
                autoFocus />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                criar
              </Button>
            </Box>

            <List sx={{ width: '90%', marginLeft: '10px', maxWidth: 360, bgcolor: 'background.paper' }}>
              {data.map((value) => (
                <ListItem
                  key={value.id}
                  disableGutters

                >
                  <ListItemText primary={`Nome: ${value.name}`} />
                  <ListItemText primary={`estoque: ${value.stock}`} />

                </ListItem>
              ))}
            </List>
          </>
        )
      }
    </>
  )
}
