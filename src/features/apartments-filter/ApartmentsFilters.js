import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoomsSelector } from '../apartments-list/apartmentsListSlice';
import { changeFilters, changeSort } from './apartmentsFiltersSlice';
import './apartments-filters.scss';

const ApartmentsFilters = () => {
    const [filterRooms, setFilterRooms] = useState("");
    const [sort, setSort] = useState("price/asc");
    const dispatch = useDispatch();
    const renderOptions = (arr) => {
        return(
            <>
                {arr.map(item => <option value={item} key={item}>{item}</option>)}            
            </>
        )
    }
    const rooms = useSelector(getRoomsSelector);

    useEffect(() => {
        dispatch(changeSort(sort));
        dispatch(changeFilters({rooms : filterRooms}));
    })

    const onSortChange = (e) => {
        const value = e.currentTarget.value
        setSort(value);
        dispatch(changeSort(value))
    }
    const onFilterRoomsChange = (e) => {
        const value = +e.currentTarget.value
        setFilterRooms(value);
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