import * as TYPE from '../contants';

const initial_state = {
    starShip: [],
    characters: [],
    planets: [],
    recentlyViewed: [],
};

export default function (state = initial_state, action) {
    const { type, payload } = action;

    switch (type) {
        case TYPE.FETCH_CHARACTERS:
            return {
                ...state,
                characters: payload,
            };
        case TYPE.FETCH_STARSHIPS:
            return {
                ...state,
                starShip: payload,
            };
        case TYPE.FETCH_PLANETS:
            return {
                ...state,
                planets: payload,
            };
        case TYPE.RECENTLY_VIEWED:
            return {
                ...state,
                recentlyViewed: [...state.recentlyViewed, payload],
            };
        default:
            return state;
    }
}