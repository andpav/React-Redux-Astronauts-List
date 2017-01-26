import inputJson from '../input.json';

/*
* Action names
* */

const ADD_ASTRONAUT = 'ADD_ASTRONAUT';
const DELETE_ASTRONAUT = 'DELETE_ASTRONAUT';

/*
* Actions
* */

function addAstronaut(astronaut) {
  return {
    type: ADD_ASTRONAUT,
    payload: astronaut
  };
}

function deleteAstronaut(astronaut) {
  return {
    type: DELETE_ASTRONAUT,
    payload: astronaut
  };
}

/*
* Reducer
* */

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
        name: action.payload.name,
        date: action.payload.date,
        days: action.payload.days,
        mission: action.payload.mission,
        isMultiple: action.payload.isMultiple
      });

      return {
        astro: astronauts
      }


    case DELETE_ASTRONAUT:
      return {
        astro: state.astro.filter(item => item.id !== action.payload.id)
      }

    default:
      return state;
  }
}

export const actions =
{
  addAstronaut,
  deleteAstronaut
};