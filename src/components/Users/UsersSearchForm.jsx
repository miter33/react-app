import {Formik, Field, Form} from 'formik';
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/selectors/users-selectors";

const usersSearchFormValidate = (values) => {
    const errors = {};
    return errors;
}


const UsersSearchForm = (props) => {
    const submit = (values, { setSubmitting }) => {
        if(values.friend === 'null') {
            values.friend = null;
        }
        else if(values.friend === 'false') {
            values.friend = false;
        }
        else if(values.friend === 'true') {
            values.friend = true;
        }
        
        props.onFilterChanged(values);
        setSubmitting(false);
    }
    
    const filter = useSelector(getUsersFilter);
    
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{ term: filter.term, friend: String(filter.friend) }}
                validate={ usersSearchFormValidate }
                onSubmit={ submit }
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" component="select">
                            <option value='null'>All</option>
                            <option value='true'>Friends</option>
                            <option value='false'>No friends</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UsersSearchForm;