import { useEffect, useRef, useState } from "react";

type TimeoutToken = ReturnType<typeof setTimeout>;

export const useThrottledValue = <T>(value: T, throttleMs = 1000): T => {
    const [throttled, setThrottled] = useState<T>(value);
    const valueToChangeRef = useRef<T>(value);
    const timeoutRef = useRef<TimeoutToken>();

    useEffect(() => {
        if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
                timeoutRef.current = undefined;

                setThrottled(valueToChangeRef.current);
            }, throttleMs);
        }
        valueToChangeRef.current = value;
    }, [value]);

    return throttled;
};
