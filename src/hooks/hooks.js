import { createRef, useEffect, useState } from 'react';
import { sections } from '../components/Header';

export const useRefs = () => {
    const refs = sections.reduce((acc, section) => {
        acc[section.id] = createRef();
        return acc;
    }, {});
    return refs;
};

export const useScroll = (isUserScroll) => {
    const [isScrolledUp, setIsScrolledUp] = useState(true);
    useEffect(() => {
        let prevScrollPos = window.scrollY;
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrollingUp = currentScrollPos < prevScrollPos && isUserScroll;
            prevScrollPos = currentScrollPos;
            setIsScrolledUp(isScrollingUp);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isUserScroll]);
    return isScrolledUp;
};

export const useUserScroll = () => {
    const [isUserScroll, setIsUserScroll] = useState(true);
    useEffect(() => {
        let timeoutId;
        if (!isUserScroll) {
            timeoutId = setTimeout(() => setIsUserScroll(true), 1000);
        } else {
            clearTimeout(timeoutId);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isUserScroll]);

    return [isUserScroll, setIsUserScroll];
}