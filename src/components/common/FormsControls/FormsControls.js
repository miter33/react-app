import style from './FormsControls.module.css'

const FormControl = ({input, meta, FormType, ...props}) => {
    const hasError = meta.error && meta.touched
    return (
        <div className={style.formControl + ' ' + (hasError && style.error)}>
            <div>
                <FormType {...input} {...props} />
            </div>
            {
                hasError && <span>{meta.error}</span>
            }
        </div>
    )
}

export const Textarea = (props) => {
    return <FormControl {...props} FormType='textarea'></FormControl>
}

export const Input = (props) => {
    return <FormControl {...props} FormType='input'></FormControl>
}