import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/apartments',}),
    tagTypes: ['Apartments'],
    endpoints: builder => ({
        getAllApartments: builder.query({
            query: () => '/',
            providesTags: ['Apartments']
        }),
        addOneApartment: builder.mutation({
            query: apartment => ({
                url: '/',
                method: 'POST',
                body: apartment                
            }),
            invalidatesTags: ['Apartments']        
        }),
        deleteOneApartment: builder.mutation({
            query: id => ({
                url: `/${id}`,
                method: 'DELETE'               
            }),
            invalidatesTags: ['Apartments']         
        })
    })
});

export const {useGetAllApartmentsQuery, 
            useAddOneApartmentMutation, 
            useDeleteOneApartmentMutation} = apiSlice;