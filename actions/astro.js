export const ADD_ASTRONAUT = 'ADD_ASTRONAUT';
export const DELETE_ASTRONAUT = 'DELETE_ASTRONAUT';

export function addAstronaut(name, date, days, mission, isMultiple) {
  return {
    type: ADD_ASTRONAUT,
    name,
    date,
    days,
    mission,
    isMultiple
  };
}

export function deleteAstronaut(id) {
  return {
    type: DELETE_ASTRONAUT,
    id
  };
}