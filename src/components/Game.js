import React, { use } from "react";
import { generateShuffledCards } from "../utils/Utils";
import { cardTypes } from "../utils/CardTypes";
import Board from "./Board";
import { useState, useEffect } from "react";

function Game() {
    const [cards, setCards] = useState(generateShuffledCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const[lockBoard, setLockBoard] = useState(false);
    const[seconds, setSeconds] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
const [score, setScore] = useState(0);
    //timer
    useEffect(() => {
        if (isGameOver) return;
        const interval  = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
    }, [isGameOver]);

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstIdx, secondIdx] = flippedCards;
            const first = cards[firstIdx];
            const second = cards[secondIdx];
            setLockBoard(true);


            if (first.type === cardTypes.TRAP || second.type === cardTypes.TRAP) {
                setTimeout(
                    () => {
                        setCards(cards.map(
                            (card) => ({...card, flipped: false })
                        ))
                        setFlippedCards([]);
                        setLockBoard(false);
                    }, 1000
                ); return;
            }
            if(first.type === cardTypes.WILD || second.type === cardTypes.WILD || first.logo === second.logo) {
                const newCards = [...cards];
                newCards[firstIdx].matched = true 
                newCards[secondIdx].matched = true;
            setTimeout(() => {
                setCards(newCards);
                setFlippedCards([]);
                setLockBoard(false);},500);
            }
            else {
                setTimeout(() => {
                    const newCards = [...cards];
                    newCards[firstIdx].flipped = false;
                    newCards[secondIdx].flipped = false;
                    setCards(newCards);
                    setFlippedCards([]);
                    setLockBoard(false);
                }, 1000);
            }
            setFlippedCards([]);
            setLockBoard(false);
        }
    }, [flippedCards, cards]);

    const handleCardClick = (index) => {
        if (lockBoard || cards[index].flipped || cards[index].matched) return;

        const newCards = [...cards];
        newCards[index].flipped = true;
        setCards(newCards);
        setFlippedCards((prev)=> [...prev, index]);
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60).toString().padStart(2, '0');
        const secs = (s % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div className="game-container">
            <h1 className="title">Memory Card Game</h1>
            <p> Time : {formatTime(seconds)}</p>
            <p>Score: {score}</p>
            {isGameOver && <p className="game-over">Game Over! Your score: {score}</p>}
            <Board cards={cards} onCardClick={handleCardClick} />

        </div>
    );
}

export default Game;