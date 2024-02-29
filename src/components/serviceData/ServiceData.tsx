import React from 'react';
import { Service } from '../../hooks/types';

export type DataProps<T> = {
    data: T
}

type Props<T> = {
    service: Service<T>,
    Renderer: React.ComponentType<DataProps<T>>
}

//TODO add components for failure and idle/loading
export const ServiceData = <T,>({
    service,
    Renderer
}: Props<T>) => {
    switch (service.state) {
        case 'IDLE':
        case 'LOADING':
            return (
                <div>
                    <p>loading</p>
                </div>
            );
        case "SUCCESS":
            return <Renderer data={service.data} />;
        case 'FAILURE':
            return (
                <div>
                    <p>Oops something went wrong</p>
                </div>
            );
        default:
            return null;
    }
};
