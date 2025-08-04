import React from "react";
import Card from "./Card";

function Board({ cards, onCardClick }) {
    return (
        <div className="grid">
            {cards.map((card, index) => (
                <Card
                    key={card.id}
                    card={card}
                    index={index}
                />
            ))}
        </div>
    );
}

export default Board;