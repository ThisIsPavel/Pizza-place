import { HeadingProps } from "./Heading.props";
import styles from "./Heading.module.css";
import cn from "classnames";

const Heading = ({
  children,
  headingLevel,
  ...props
}: HeadingProps) => {
  const Heading = headingLevel ?? "h3";
  return (
    <Heading
      className={cn(styles.heading, {
        [styles["heading--h3"]]: Heading === "h3",
        [styles["heading--h1"]]: Heading === "h1",
      })}
      {...props}
    >
      {children}
    </Heading>
  );
};

export default Heading;
