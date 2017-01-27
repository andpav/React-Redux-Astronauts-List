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
    payload: astronaut,
  };
}

function deleteAstronaut(astronaut) {
  return {
    type: DELETE_ASTRONAUT,
    payload: astronaut,
  };
}

/*
* Reducer
* */

const astronautsList = inputJson;
let idIncr = astronautsList.length - 1; // "unique" identifier

astronautsList.map(astronautsListItem => {
  const astronaut = astronautsListItem;

  astronaut.date = new Date(parseInt(astronaut.date, 10) * 1000).toLocaleDateString();

  return astronaut;
});

const initialState = { astro: astronautsList };

export default function (state = initialState, action) {
  switch (action.type) {

    case ADD_ASTRONAUT: {
      idIncr++;

      const astronauts = state.astro;

      astronauts.push({
        id: idIncr,
        name: action.payload.name,
        date: action.payload.date,
        days: action.payload.days,
        mission: action.payload.mission,
        isMultiple: action.payload.isMultiple,
      });

      return {
        astro: astronauts,
      };
    }

    case DELETE_ASTRONAUT: {
      return {
        astro: state.astro.filter(item => item.id !== action.payload.id),
      };
    }

    default:
      return state;
  }
}

export const actions = {
  addAstronaut,
  deleteAstronaut,
};
