import { useState } from 'react';

export function useToggle(initial: boolean = false): [boolean, () => void] {
    const [value, setValue] = useState(initial);
    return [value, () => setValue(v => !v)];
}