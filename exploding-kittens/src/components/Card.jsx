import React from 'react'
import { motion } from "framer-motion"

//Have a dictionary of all possible card types and feed that as data to the card as props?

/*
Requiremnts

1. Title
2. Description
3. Art work
4. Card type
5. Is card playable? - if no "grey it out"
*/

const Card = ( {title, description, artWork, cardType}) => {
  return (
    <motion.div whileHover={{ scale: 1.2 }} className="w-36 h-48 bg-white shadow-lg rounded-lg overflow-hidden" draggable>
        <img
       // draggable="false" 
      className="object-cover object-center"
      src={artWork}
      alt={title}
    />
    </motion.div>
  )
}

export default Card