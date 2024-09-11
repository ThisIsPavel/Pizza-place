import { HTMLAttributes, ReactNode } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  headingLevel: "h1" | "h3";
  children: ReactNode;
}
