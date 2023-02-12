import { useSelector} from 'react-redux';
import { useCallback, createRef, useRef } from 'react';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import ApartmentsListItem from './ApartmentsListItem';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import { filteredApartmentsSelector } from '../apartments-filter/apartmentsFiltersSlice';
import { useGetAllApartmentsQuery, useDeleteOneApartmentMutation } from '../api/apiSlice';
import './apartments-list.scss';

const ApartmentsList = () => {
    const {
        data: apartments = [],
        isLoading,
        isFetching,
        isError
    } = useGetAllApartmentsQuery();
    const [deleteApartment] = useDeleteOneApartmentMutation();
    const filteredItems = useSelector(state => filteredApartmentsSelector(state, apartments));
    const count = filteredItems.length || "Loading...";

    const handleDelete = useCallback((id) => {
        deleteApartment(id).unwrap();
    }, [deleteApartment]);

    let elemsRef = useRef([]);
    const renderItems = (arr) => {
        if (arr.length === 0) {
            return (
                <div className="apartments-list__none">There are no available apartments</div>
            )
        }
        return (
            <TransitionGroup>
                {arr.map((item, i) => {
                    elemsRef.current[i] = createRef(); 
                    return (
                        <CSSTransition
                            key={item.id}
                            classNames="fade-in"
                            timeout={500}
                            nodeRef={elemsRef.current[i]}>
                            <ApartmentsListItem 
                                {...item} 
                                key={item.id} 
                                handleDelete={() => handleDelete(item.id)} 
                                nodeRef={elemsRef.current[i]}/>  
                        </CSSTransition>                    
                    )
                })}
            </TransitionGroup>
        )
    }
    
    return(
        <div className="apartments-list">
            <div className="apartments-list__title">Available apartments ({count})</div>
            {filteredItems.length > 0 && renderItems(filteredItems)}
            {(isLoading || isFetching) && <Spinner/>}
            {isError && <Error/>}           
        </div> 
    )
} 

export default ApartmentsList;
