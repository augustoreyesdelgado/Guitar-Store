import { useEffect, useState } from "react"
import Header from "./componets/Header"
import Footer from "./componets/Footer"
import Guitar from "./componets/Guitar"
import { db } from "./data/db"


function App() {

    const initialCart = () =>{
      const localStorageCart = localStorage.getItem('cart')
      return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 10

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (item) =>{
      const itemExiste = cart.findIndex(guitar => guitar.id === item.id)
      if (itemExiste>=0){
        if(cart[itemExiste].quantity >= MAX_ITEMS) return
        console.log('ya existe')
        const updatedCart = [...cart]
        updatedCart[itemExiste].quantity++
        setCart(updatedCart)
      }else{
        item.quantity = 1
        console.log('No existe, agregando')
        setCart(prevCart => [...prevCart, item])
      }
    }

    const removeFromCart = (id) =>{
      setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    const increseQuantity = (id) =>{
      const updatedCart = cart.map( item =>{
        if (item.id === id && item.quantity < MAX_ITEMS){
          return{
            ...item,
            quantity: item.quantity+1
          }
        }
        return item
      })
      setCart(updatedCart)
    }

    const decreseQuantity = (id) =>{
      const updatedCart = cart.map( item =>{
        if (item.id === id && item.quantity>1){
          return{
            ...item,
            quantity: item.quantity-1
          }
        }
        return item
      })
      setCart(updatedCart)
    }

    const cleanCart = () =>{
        setCart([])
    }

    return (
      <>

      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increseQuantity={increseQuantity}
        decreseQuantity={decreseQuantity}
        cleanCart={cleanCart}
      />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {data.map((guitar)=>
            
                <Guitar
                    key={guitar.id}
                    guitar={guitar}
                    setCart={setCart}
                    addToCart={addToCart}
                />

            )}

          </div>
      </main>

      <Footer/>

      </>
    )
}

export default App
