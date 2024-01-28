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
};

export const useInterSectionObserver = (data) => {

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    entry.target.classList.toggle('animate', entry.isIntersecting);
                });
            },
            {
                threshold: 0.8, // Adjust the threshold as needed
                rootMargin: '10px'
            }
        );

        // Observe each section element
        Object.values(data).forEach(item => {
            observer.observe(item);
        });
        return () => {
            // Disconnect the observer when the component unmounts
            Object.values(data).forEach(item => {
                observer.unobserve(item);
            });
        };
    }, [data]);
};