
import {useState} from "react";

export function useStorage(key, defaultValue = null) {
    let stored = localStorage.getItem(key)
    if (stored == null) {
        localStorage.setItem(key, JSON.stringify(defaultValue))
    }
    let value = JSON.parse(stored)
    const [state, setter] = useState(value)

    return [
        state == null ? defaultValue : state,
        (arg) => {
            localStorage.setItem(key, JSON.stringify(arg))
            setter(arg)
        }
    ]
}