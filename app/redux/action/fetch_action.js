import { api_instance } from "../../config/axios";
import { ApiErrorHandler } from "../../util/errorHandler";


export const FetchStarships = () => async (dispatch) => {
    try {
        const res = await api_instance.get('/starships')

        if (res.status === 200) {
            dispatch({
                type: 'FETCH_STARSHIPS',
                payload: res?.data?.results
            })
        }
    } catch (e) {
        ApiErrorHandler(
            e.response === undefined
                ? e.message
                : e.response.data?.message === undefined
                    ? e.response.data
                    : e.response.data?.message,
        );
    }
}

export const FetchCharacters = () => async (dispatch) => {
    try {
        const res = await api_instance.get('/people')
        if (res.status === 200) {
            dispatch({
                type: 'FETCH_CHARACTERS',
                payload: res?.data?.results
            })
        }
    } catch (e) {
        ApiErrorHandler(
            e.response === undefined
                ? e.message
                : e.response.data?.message === undefined
                    ? e.response.data
                    : e.response.data?.message,
        );
    }
}

export const FetchPlanets = () => async (dispatch) => {
    try {
        const res = await api_instance.get('/planets')
        if (res.status === 200) {
            dispatch({
                type: 'FETCH_PLANETS',
                payload: res?.data?.results
            })
        }
    } catch (e) {
        ApiErrorHandler(
            e.response === undefined
                ? e.message
                : e.response.data?.message === undefined
                    ? e.response.data
                    : e.response.data?.message,
        );
    }
}

export const storeRecentlyViewed = (item) => async (dispatch) => {
    dispatch({
        type: 'RECENTLY_VIEWED',
        payload: item
    })
}
