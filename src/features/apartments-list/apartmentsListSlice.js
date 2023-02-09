import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";

const initialState = {
    apartments : [
        {
            id: '1',
            name: 'Small apartment',
            rooms: 1,
            price: 300,
            description: "It's so small and cozy!"
        },
        {
            id: '2',
            name: 'Penthouse',
            rooms: 5,
            price: 5000,
            description: "Excellent view"
        },
        {
            id: '3',
            name: 'Ordinary apartment',
            rooms: 2,
            price: 700,
            description: "It's just fine"
        },
        {
            id: '4',
            name: 'Cabin in the woods',
            rooms: 3,
            price: 100,
            description: "This is an introvert's dream"
        }
    ]    
}
const apartmentsListSlice = createSlice({
    name: "apartments",
    initialState,
    reducers: {
        setAllApartments: (state, action) => {state.apartments = action.payload},
        addApartment: {
            reducer: (state, action) => {state.apartments.push(action.payload)},
            prepare: (data) => {
                const id = nanoid();
                return {payload: {...data, id}}
            }
        },
        deleteApartment: (state, action) => {state.apartments = state.apartments.filter(item => item.id !== action.payload)}
    }
})

const {reducer, actions} = apartmentsListSlice;
export default reducer;
export const {
    setAllApartments,
    addApartment,
    deleteApartment
} = actions;

export const getRoomsSelector = createSelector(
    (state) => state.apartments.apartments,
    (apartments) => Array.from(new Set(apartments.map(item => item.rooms).sort((a, b) => a - b)))
)