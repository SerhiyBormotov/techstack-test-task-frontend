import { useSelector, useDispatch } from 'react-redux';
import { useCallback, createRef, useRef } from 'react';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import ApartmentsListItem from './ApartmentsListItem';
import { deleteApartment } from './apartmentsListSlice';
import { filteredApartmentSelector } from '../apartments-filter/apartmentsFiltersSlice';
import './apartments-list.scss';

const ApartmentsList = () => {
    const dispatch = useDispatch();
    const filteredItems = useSelector(filteredApartmentSelector);
    const count = filteredItems.length;

    const handleDelete = useCallback((id) => {
        dispatch(deleteApartment(id));
    }, [dispatch]);

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
            {renderItems(filteredItems)}           
        </div> 
    )
} 


export default ApartmentsList;
