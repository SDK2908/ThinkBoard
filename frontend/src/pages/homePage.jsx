import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import Ratelimiterui from '../components/ratelimiterui'
import Navbar from '../components/Navbar'
import api from '../lib/axios'
import NoteCard from '../components/NoteCard'
import NoteNotFound from '../components/NoteNotFound'
import {useEffect} from 'react'
import toast from 'react-hot-toast'



const HomePage = () => {
  const [isRatelimited, setIsRatelimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/")
        console.log(res.data)
        setNotes(res.data)
        setIsRatelimited(false)  
      } catch (error) {
        console.log("Error fetching notes:")
        console.log(error.response)

        if(error.response?.status === 429) {
          setIsRatelimited(true)
          return
        }
        else{
          toast.error("Failed to load notes.")
        }
        
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className = "min-h-screen">
      <Navbar />
      {isRatelimited && <Ratelimiterui />}
      
      <div className="max-w-7xl mx-auto p-4 mt-6">

        {loading && (<div className="text-primary py-10">Loading notes...</div>
        )}



        {!loading && notes.length == 0 && !isRatelimited && (
          <NoteNotFound />

        )}
        {notes.length > 0 && !isRatelimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
