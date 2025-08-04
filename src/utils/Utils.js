import { type } from "@testing-library/user-event/dist/type";
import { cardTypes } from "./CardTypes";

const logos  = [
    "React", "Angular", "Vue", "Node", "JavaScript", "Python", "Java", "C#", "JavaaScripyt"]

    export const generateShuffledCards = () => {
        const pairs = [...logos, ...logos].map((logo, i) => ({
            id : i,
            logo,
            flipped: false,
            matched: false,
            type: cardTypes.REGULAR
        }));

        const specialCards = [
            {type: cardTypes.WILD},
            {type: cardTypes.WILD},
            {type: cardTypes.TRAP}, 
            {type: cardTypes.TRAP}
        ];

        specialCards.forEach((special) => {
            const index = Math.floor(Math.random() * pairs.length);
            pairs.splice(index, 0, {
                id : `special-${Math.random()}`,
                logo: special.type === cardTypes.WILD ? "WILD" : "TRAP",
                flipped: false,
                matched: false,
                type: special.type
            });
        });
        return pairs.sort(() => Math.random() - 0.5);
    };