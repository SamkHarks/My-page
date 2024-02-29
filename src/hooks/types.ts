import React from "react";

export type SectionRefs = Record<string,React.RefObject<HTMLDivElement>>;

type Idle = { state: 'IDLE' };
type Loading = { state: 'LOADING' };
type Success<T> = { state: 'SUCCESS', data: T };
type Failure = { state: 'FAILURE', error: Error };
export type Service<T> = Idle | Loading | Success<T> | Failure;