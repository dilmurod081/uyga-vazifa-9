import { useEffect, useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
const localdata = JSON.parse(localStorage.getItem("api"))||[]
const [api,setApi]=useState(localdata)
const [val,setVal]=useState("")
const handleSubmit = (evt)=>{
  evt.preventDefault()
if (val) {
  const api_key = "6aaa23c0872dd75f84f64569bc7a98cd"
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&units=Metric&appid=${api_key}`)
  .then(res=>res.json())
  .then(data=>{
    setApi(data)
    console.log(data)
    localStorage.setItem("api",JSON.stringify(data))
  })
  .catch(err=>console.error(err))
  toast.success("Tayyor✅")
}else{
toast.info("Joylashuv nomini kiriting❗")
}
}
const value = (evt)=>{
  setVal(evt.target.value)
}
useEffect(()=>{
  document.title = "Ob-Xavo🌡️"
},[])
  return (
    <div className='container'>
    <ToastContainer/>
    <div className='box'>
    <div>
      <h2 className='title'>{api?.name}</h2>
      <p className='may'>Friday 29 September 2023</p>
     </div>
     <span>
      <img src={`https://openweathermap.org/img/wn/${api?.weather?.map(item=>item.icon)}@2x.png`} alt="obxavo" />
     </span>
     <span className='flex'>
      <h2 className='flex--title'>{api?.main?.temp}<sup>○</sup></h2>
      <span>
        <h3>{api?.weather?.map(item=>item.description)}</h3>
        <p>{api?.main?.temp_max}<sup>○</sup>C</p>
        <p>{api?.main?.temp_min}<sup>○</sup>C</p>
      </span>
     </span>  
     <span className='flex-2'>
      <span className='wind'>
        <h3>Wind</h3>
        <p>{api?.wind?.speed}k/h</p>
      </span>
      <span>
        <h3>Humidity</h3>
        <p>{api?.main?.humidity}%</p>
      </span>
      <span className='vis'>
        <h3>Visibility</h3>
        <p>{api?.visibility} km</p>
      </span>
     </span>
    </div>
    <div className='box-2'>
      <form onSubmit={handleSubmit}>
        <input title='поиск👆'  minLength={5} className='inp' onChange={value} type="search" placeholder='Joylashuv nomini kiriting'/>
        <button className='btn'>Qidirish🔍</button>
      </form>
    </div>
    </div>
  )
}

export default App
