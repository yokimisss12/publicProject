import { useEffect, useRef, useState } from "react";

const useCountDown = ({ leftTime = 0, ms = 1000, onEnd = () => { } }) => {
    const countdownTimer = useRef<any>();
    const startTimer = useRef<any>();
    //记录初始时间
    const startTimeRef = useRef(performance.now());
    // 第一次执行的时间处理，让下一次倒计时时调整为整数
    const nextTimeRef = useRef(leftTime % ms);

    const [count, setCount] = useState(leftTime);

    const clearTimer = () => {
        countdownTimer.current && clearTimeout(countdownTimer.current);
        startTimer.current && clearTimeout(startTimer.current);
    };

    const startCountDown = () => {
        clearTimer();
        const currentTime = performance.now();
        // 算出每次实际执行的时间
        const executionTime = currentTime - startTimeRef.current;

        // 实际执行时间大于上一次需要执行的时间，说明执行时间多了，否则需要补上差的时间
        const diffTime =
            executionTime > nextTimeRef.current
                ? executionTime - nextTimeRef.current
                : nextTimeRef.current - executionTime;

        setCount((count: any) => {
            const nextCount =
                count - (Math.floor(executionTime / ms) || 1) * ms - diffTime;
            return nextCount <= 0 ? 0 : nextCount;
        });

        // 算出下一次的时间
        nextTimeRef.current =
            executionTime > nextTimeRef.current ? ms - diffTime : ms + diffTime;

        // 重置初始时间
        startTimeRef.current = performance.now();

        countdownTimer.current = setTimeout(() => {
            requestAnimationFrame(startCountDown);
        }, nextTimeRef.current);
    };

    useEffect(() => {
        setCount(leftTime);
        startTimer.current = setTimeout(startCountDown, nextTimeRef.current);
        return () => {
            clearTimer();
        };
    }, [leftTime]);

    useEffect(() => {
        if (count <= 0) {
            clearTimer();
            onEnd && onEnd();
        }
    }, [count]);

    return count;
};

export default useCountDown;
