import React from "react";
import { Section } from "../App";

export type SectionRefs = Record<
  Section["id"],
  React.RefObject<HTMLDivElement>
>;

type Idle = { state: "IDLE" };
type Loading = { state: "LOADING" };
type Success<T> = { state: "SUCCESS"; data: T };
type Failure = { state: "FAILURE"; error: Error };
export type Service<T> = Idle | Loading | Success<T> | Failure;
