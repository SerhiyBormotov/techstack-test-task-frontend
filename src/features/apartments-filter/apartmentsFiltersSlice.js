import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    sort: {price: "asc"},
    filter: [{rooms: ""}]
}
const validDirection = ["asc", "desc"];
const validField = ["id", "name", "direction", "price", "rooms"];

const apartmentsFiltersSlice = createSlice({
    name: "filters",
    initialState,
    reducers:{
        changeSort: {
            reducer: (state, action) => {
                if (action.payload) {
                   state.sort = { [action.payload.field] : action.payload.direction }
                }
            },
            prepare: (text) => {
                const [field, direction] = text.split("/");
                if (validDirection.some(item => item === direction) && validField.some(item => item === field)) {
                    return {payload: {field, direction}}
                } else {
                    console.log("Sort validation error");
                    return {payload: null}
                }
            }
        },
        changeFilters: {
            reducer: (state, action) => {
                if (action.payload) {
                    const field = Object.keys(action.payload)[0];
                    const value = action.payload[field];
                    state.filter = state.filter.map(item => Object.keys(item)[0] === field ? {[field] : value} : item) 
                }
            },
            prepare: (data) => {
                const field = Object.keys(data)[0];
                if (validField.some(item => item === field)) {
                    return {payload: data};
                } else {
                    console.log("Filter field validation error");
                    return {payload: null};
                }
            }
        }
    }
})

const {reducer, actions} = apartmentsFiltersSlice;
export default reducer;
export const {
    changeFilters,
    changeSort
} = actions;

const sortBy = (list, sort) => {
    const field = Object.keys(sort)[0];
    const direction = sort[field];
    let sortFunc;
    let res = list.slice();
    if (direction === "asc" ) {
        sortFunc = (objA, objB) => {
            const a = objA[field];
            const b = objB[field];
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        }
    } 
    if (direction === "desc" ) {
        sortFunc = (objA, objB) => {
            const a = objA[field];
            const b = objB[field];
            if (a > b) {
                return -1;
            } else if (a < b) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    
    return res.sort(sortFunc);
}

const filterBy = (list, filters) => {    
    return list.filter( 
            item => filters.every( 
                filter => Object.values(filter)[0] ? item[Object.keys(filter)[0]] === Object.values(filter)[0] : true
            ) 
        );
}

export const filteredApartmentSelector = createSelector(
    (state) => state.filters.filter,
    (state) => state.filters.sort,
    (state) => state.apartments.apartments,
    (filters, sort, apartments) => {        
        let res = sortBy(apartments, sort);
        res = filterBy(res, filters);
        return res;
    }

)