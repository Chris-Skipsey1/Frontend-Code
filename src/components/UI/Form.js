import { useState } from 'react';
import './Form.scss';

export default function Form({ children }) {

    return (
        <borderlayout className="BorderedForm">
            <div className="FormTray">
                {
                    children
                }
            </div>

        </borderlayout>
    );
}


function Item({ children, label, htmlFor, advice, error }) {

    return (
        <div className="FormItem">
            <label className="FormLabel" htmlFor={htmlFor}>{label}</label>
            {
                advice && <h3 className="FormAdvice">{advice}</h3>
            }
            {children}
            {
                error && <p className="FormError">{error}</p>
            }
        </div>
    );
}

function useForm(initialRecord, conformance, { isValid, errorMessage }, onSubmit) {
    // Initialisation
    // Hooks
    // State
    const [record, setRecord] = useState(initialRecord);
    const [errors, setErrors] = useState(
        Object.keys(initialRecord).reduce(
            (accum, key) => ({ ...accum, [key]: null }), {})
    );
    // Context
    // Handlers
    const handleChange2 = (event) => {
        const { name, value } = event.target;
        const newValue = conformance.includes(name) ? parseInt(value) : value;
        setRecord({ ...record, [name]: newValue });
        setErrors({ ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name] });
    };

    const isValidRecord = (record) => {
        let isRecordValid = true;
        Object.keys(isValid).forEach((key) => {
            if (isValid[key](record[key])) {
                errors[key] = null;
            } else {
                errors[key] = isValid.errorMessage[key];
                isRecordValid = false;
            }
        });
        return isRecordValid;
    }

    const handleSubmit = () => {
        onSubmit(record);
        isValidRecord(record);
        setErrors({ ...errors });

    }

    // View
    return [record, setRecord, errors, handleChange2, handleSubmit];

}

Form.Item = Item;
Form.useForm = useForm;