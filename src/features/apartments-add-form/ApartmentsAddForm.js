import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddOneApartmentMutation } from '../api/apiSlice';

import './apartments-add-form.scss';

const CustomInputField = ({name, caption, ...props}) => {
    return(
        <>
            <label htmlFor={name} className="apartment-add-form__label">{caption}</label>
            <Field 
                {...props}
                id={name} 
                name={name} 
                className="apartment-add-form__input" />
            <ErrorMessage name={name} className="apartment-add-form__error" component="div"/>
        </>
    )
}

const ApartmentsAddForm = () => {
    const [addApartment] = useAddOneApartmentMutation();

    return(
        <div className="apartment-add-form">
            <div className="apartment-add-form__title">Add new apartment</div>
            <Formik
                initialValues={{
                    name: "",
                    price: 0,
                    rooms: 0,
                    description: ""
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                            .required("Required field!")
                            .max(99, "Maximum 99 characters"),
                    rooms: Yup.number("Only numbers")
                              .moreThan(0, "Can't be 0 or less than 0")
                              .required("Required field!"),
                    price: Yup.number("Only numbers")
                              .moreThan(0, "Can't be 0 or less than 0")
                              .required("Required field!"),
                    description: Yup.string()
                            .max(999, "Maximum 999 characters"),
                })}
                onSubmit = {(values, {resetForm}) => {
                    addApartment(values);
                    resetForm();
                }} >
                <Form  className="apartment-add-form__form">
                    <CustomInputField
                        name="name"
                        caption="Apartment name"
                        type="text"/>
                    <CustomInputField
                        name="rooms"
                        caption="Number of rooms"
                        type="number"
                        min="0"/>
                    <CustomInputField
                        name="price"
                        caption="Price (USD)"
                        type="number"
                        min="0"/>
                    <CustomInputField
                        name="description"
                        caption="Description"
                        as="textarea"/>
                    <button type="submit" className="apartment-add-form__button">Add</button>
                </Form>
            </Formik>
        </div> 
    )
}

export default ApartmentsAddForm;