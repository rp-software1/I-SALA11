import { useState } from 'react';

interface ProjectFormState {
    name: string;
    owner: string;
    budget: string;   // string en el form, se convierte a number al enviar
    status: 'active' | 'paused';
}

const initial: ProjectFormState = {
    name: '', owner: '', budget: '', status: 'active',
};

export function useForm() {
    const [fields, setFields] = useState<ProjectFormState>(initial);

    function setField(key: keyof ProjectFormState, value: string) {
        setFields(prev => ({ ...prev, [key]: value }));
    }

    function reset() { setFields(initial); }

    return { fields, setField, reset };
}