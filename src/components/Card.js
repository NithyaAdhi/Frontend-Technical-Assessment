import React from "react";
import {motion} from "framer-motion";


function Card( { card, index, onClick }) {
  
  return (
    <motion.div
      className={`card ${card.flipped || card.matched ?  "flipped" : ""} ${card.type}`}>
        onClick={() => onClick(index)}
        whileTap={{ scale: 0.95 }}
        

        <div className="card-inner">
            <div className="card-front"></div>
            <div className="card-back">
                {
                    card.flipped || card.matched ? card.logo : ""}
                
            </div>
            </div>
        </motion.div>

  );
}

export default Card;