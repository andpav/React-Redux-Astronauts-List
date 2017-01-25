import inputJson from '../input.json';
import { ADD_ASTRONAUT, DELETE_ASTRONAUT } from '../actions/astro';

const astronauts = inputJson;

let idIncr = astronauts.length - 1; // "unique" identifier

astronauts.map( astronaut => {
  astronaut.date = new Date(parseInt(astronaut.date) * 1000).toLocaleDateString();
})

const initialState = { astro: astronauts };

export default function (state = initialState, action) {
  switch (action.type) {

    case ADD_ASTRONAUT:
      idIncr ++ ;

      const astronauts = state.astro;

      astronauts.push({
        id: idIncr,
        name: action.name,
        date: action.date,
        days: action.days,
        mission: action.mission,
        isMultiple: action.isMultiple
      });

      return {
        astro: astronauts
      }


    case DELETE_ASTRONAUT:
      return {
        astro: state.astro.filter(item => item.id !== action.id)
      }

    default:
      return state;
  }
}