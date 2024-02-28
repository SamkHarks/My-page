import React from 'react';
import { sections } from '../components/header/Header';
import { SectionRefs } from './types';

export const useRefs = (): SectionRefs => {
    const refs = sections.reduce((acc, section) => {
        acc[section.id] = React.createRef<HTMLDivElement>();
        return acc;
    }, {} as SectionRefs);
    return refs;
};

export const useScroll = () => {
    const [scrollProgress, setScrollProgress] = React.useState(0);
    React.useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            let progress = (currentScroll / totalScroll) * 100;
            progress = Math.min(100, Math.max(0, progress));
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return scrollProgress;
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