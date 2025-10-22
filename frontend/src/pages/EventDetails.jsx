import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/api'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'


export default function EventDetails(){
const { id } = useParams()
const [event, setEvent] = useState(null)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE)


useEffect(()=>{
const fetchEvent = async ()=>{
try{ const res = await API.get(`/api/events/${id}`); setEvent(res.data) }catch(err){ console.error(err) }
}
fetchEvent()
},[id])


const registerLocal = async ()=>{
try{
await API.post(`/api/events/${id}/register`)
toast.success('Registered (free)')
}catch(err){ toast.error(err.response?.data?.message || 'Failed') }
}


const handleCheckout = async ()=>{
try{
const res = await API.post(`/api/events/${id}/create-checkout-session`)
const stripe = await stripePromise
await stripe.redirectToCheckout({ sessionId: res.data.id })
}catch(err){ toast.error(err.response?.data?.message || 'Payment failed') }
}


if (!event) return <div>Loading...</div>


return (
<div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
<h1 className="text-2xl font-bold">{event.title}</h1>
<p className="text-sm text-gray-600">{new Date(event.date).toLocaleString()}</p>
<p className="mt-4">{event.description}</p>
<div className="mt-6 flex items-center gap-4">
{event.price > 0 ? (
<button onClick={handleCheckout} className="px-4 py-2 bg-green-600 text-white rounded">Pay ₹{event.price}</button>
) : (
<button onClick={registerLocal} className="px-4 py-2 bg-indigo-600 text-white rounded">Register</button>
)}
<span className="text-sm text-gray-500">{event.attendees?.length || 0} attendees</span>
</div>
</div>
)
}