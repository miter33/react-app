import {Formik, Field, Form} from 'formik';

const usersSearchFormValidate = (values) => {
    const errors = {};
    return errors;
}


const UsersSearchForm = (props) => {
    const submit = (values, { setSubmitting }) => {
        debugger
        values.friend = (values.friend === 'null') ? null : (values.friend === 'true' ? true : false);
        debugger
        props.onFilterChanged(values);
        setSubmitting(false);
    }
    
    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: null }}
                validate={ usersSearchFormValidate }
                onSubmit={ submit }
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" component="select">
                            <option value={null}>All</option>
                            <option value={true}>Friends</option>
                            <option value={false}>No friends</option>
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