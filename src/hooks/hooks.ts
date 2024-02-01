import React from 'react';
import { sections } from '../components/Header';

export const useRefs = (): { [key: string]: React.RefObject<HTMLElement> } => {
    const refs = sections.reduce((acc, section) => {
        acc[section.id] = React.createRef<HTMLElement>();
        return acc;
    }, {} as { [key: string]: React.RefObject<HTMLElement> });
    return refs;
};

export const useScroll = (isUserScroll: boolean) => {
    const [isScrolledUp, setIsScrolledUp] = React.useState(true);
    React.useEffect(() => {
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
    const [isUserScroll, setIsUserScroll] = React.useState(true);
    React.useEffect(() => {
        let timeoutId:ReturnType<typeof setTimeout>;
        if (!isUserScroll) {
            timeoutId = setTimeout(() => setIsUserScroll(true), 1000);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isUserScroll]);

    return [isUserScroll, setIsUserScroll];
};

export const useInterSectionObserver = (data: Element[]) => {
    React.useEffect(() => {
        if (data.length > 0) {
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
                observer.disconnect();
            };
        }
    }, [data]);
};