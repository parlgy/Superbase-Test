import supabase from "../config/supabaseClient"
import { useState, useEffect } from "react"

import SmoothieCard from "../components/smoothieCard"


const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const {data, error} = await supabase
      .from('smoothies')
      .select()
      .order(orderBy, {ascending: false})

      if(error){
        setFetchError('Could not fetch the error')
        setSmoothies(null)
        console.log(error)
      }
      if(data){
        setSmoothies(data)
        setFetchError(null)
        // console.log(data) 
      }
    }

    fetchSmoothies()
  }, [orderBy])
   
  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
        <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div>
        <div className="smoothie-grid">
          {smoothies.map(smoothie => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete}/>
          ))}
        </div>
      </div>
        )}
    </div>
  )
}

export default Home