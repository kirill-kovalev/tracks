
import {useState} from "react";

export function useStorage(key, defaultValue = null) {
    let stored = localStorage.getItem(key)

    let value = JSON.parse(stored) || defaultValue
    const [state, setter] = useState(value)

    return [
        state,
        (arg) => {

            let newValue

            if (typeof arg === 'function') {
                newValue = arg(state)
            } else {
                newValue = arg
            }

            localStorage.setItem(key, JSON.stringify(newValue))
            setter(arg)
        }
    ]
}