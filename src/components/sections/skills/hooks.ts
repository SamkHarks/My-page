import React from 'react';
import { useAcyncFunction } from '../../../hooks/hooks';
import { Skills } from './types';


export const useFetchSkills = () => {
    const fetchSkills = React.useCallback(async () => {
        const response = await fetch('/data/skills.json');
        if (response.ok) {
            return response.json();
        }
        throw new Error("Failed to fetch skills");
    }, []);
    const [service, callService] = useAcyncFunction<Skills>(fetchSkills);

    React.useEffect(() => {
        callService();
    }, [callService]);

    return React.useMemo(
        () => (
            service
        ),
        [service]
    );
};
