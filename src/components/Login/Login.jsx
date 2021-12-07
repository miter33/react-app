import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import style from '../common/FormsControls/FormsControls.module.css'

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    placeholder={'Email'}
                    name={'email'}
                    component={Input}
                    validate={[requiredField]}
                />
            </div>
            <div>
                <Field 
                    placeholder={'Password'} 
                    name={'password'} 
                    component={Input}
                    validate={[requiredField]}
                />
            </div>
            <div>
                <Field 
                    type={'checkbox'}
                    name={'rememberMe'} 
                    component={Input} 
                /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
            {
                error &&
                <div className={style.errorSummary}>
                    {error}
                </div>
            }
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginThunkCreator(formData.email, formData.password, formData.rememberMe)
    }
    
    if(props.isAuth) {
        return <Navigate to={'/profile'} />
    }
    
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {loginThunkCreator})(Login);