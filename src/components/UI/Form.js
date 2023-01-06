import { useState } from 'react';
import './Form.scss';

export default function Form({children}) {
    // Initialisation
    // Hooks
    // State
    // Context
    // Handlers
    // View
    return (
        <form className="BorderedForm">
            <div className="FormTray">
                {
                children
                }
            </div>

        </form>
    );
}


function Item({ children, label, htmlFor, advice, error }) {
    // Initialisation
    // Hooks
    // State
    // Context
    // Handlers
    // View
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

function useForm(initialRecord) {
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
    // View
    return [record, setRecord, errors, setErrors];
        
    
}

// Compose Form Object
Form.Item = Item;
Form.useForm = useForm;