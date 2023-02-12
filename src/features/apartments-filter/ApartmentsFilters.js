import {  useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilters, changeSort, sortToStringSelector, filterRoomsToStringSelector } from './apartmentsFiltersSlice';
import { useGetAllApartmentsQuery } from '../api/apiSlice';
import './apartments-filters.scss';

const ApartmentsFilters = () => {
    const filterRooms = useSelector(filterRoomsToStringSelector);
    const sort = useSelector(sortToStringSelector);
    const dispatch = useDispatch();
    const {data: apartments = []} = useGetAllApartmentsQuery();

    const renderOptions = (arr) => {
        return(
            <>
                {arr && arr.map(item => <option value={item} key={item}>{item}</option>)}            
            </>
        )
    }

    const rooms = useMemo(() => {
        return Array.from(new Set(apartments.map(item => item.rooms).sort((a, b) => a - b)));
    }, [apartments]);


    const onSortChange = (e) => {
        const value = e.currentTarget.value
        dispatch(changeSort(value))
    }
    const onFilterRoomsChange = (e) => {
        const value = +e.currentTarget.value
        dispatch(changeFilters({rooms : value}));
    }

    return(
        <div className="apartments-filters">
            <div className="apartments-filters__block">
                <label htmlFor="filter-rooms" className="apartments-filters__label">Filter by rooms:</label>                
                <select 
                    name="filter-rooms" 
                    id="filter-rooms" 
                    className="apartments-filters__select" 
                    value={filterRooms}
                    onChange={onFilterRoomsChange}>
                    <option value="">All</option>
                    {renderOptions(rooms)}
                </select>
            </div>
            <div className="apartments-filters__block">
                <label htmlFor="sort-price"  className="apartments-filters__label">Sort by:</label>                
                <select 
                    name="sort-price" 
                    id="sort-price"  
                    className="apartments-filters__select" 
                    value={sort}
                    onChange={onSortChange}
                    >
                    <option value="price/asc">Price - lowest to highest</option>
                    <option value="price/desc">Price - highest to lowest</option>
                </select>
            </div>
        </div>    
    )
}

export default ApartmentsFilters;