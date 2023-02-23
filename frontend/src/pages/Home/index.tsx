import { useEffect, useState } from "react"
import { axios } from "../../api/axios"
import { useAuthStore } from "../../store/auth"
import { ItensType } from "./types"
import { useOrderStore } from "../../store/order"
import { useNavigate } from "react-router-dom"
import { HeaderMenu } from "../../components/headerMenu"
import { formatterMoney } from './../../utils/money'
export function Home() {
  const authToken = useAuthStore(state => state.authToken)
  const navigate = useNavigate();
  const setItem = useOrderStore(state => state.setItemOrder)
  const [data, setData] = useState<ItensType[]>([])
  const handlePurchase = (item: ItensType) => {
    setItem(item)
    navigate('/order')
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
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <HeaderMenu />
      <div className="containerItens">
        {data?.map(itens => (
          <div className="cardItem">
            <img src={itens.imgUrl} alt="" width='200px' />
            <p>Name: {itens.name}</p>
            <p style={{ width: '300px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>Description: {itens.description}</p>
            <p>{formatterMoney.format(itens.price)}</p>
            <button onClick={() => handlePurchase(itens)}>Comprar</button>
          </div>
        ))}
      </div >
    </>

  )
}