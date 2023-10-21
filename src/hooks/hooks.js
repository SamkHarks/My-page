import { createRef, useEffect, useState } from 'react';
import { sections } from '../components/Header';

export const useRefs = () => {
    const refs = sections.reduce((acc, section) => {
        acc[section.id] = createRef();
        return acc;
    }, {});
    return refs;
};

export const useScroll = () => {
    const [isScrolledUp, setIsScrolledUp] = useState(true);
    useEffect(() => {
        let prevScrollPos = window.scrollY;
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrollingUp = currentScrollPos < prevScrollPos;
            prevScrollPos = currentScrollPos;
            setIsScrolledUp(isScrollingUp);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return isScrolledUp;
};