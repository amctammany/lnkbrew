export type BodyProps = {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
};
export const Body = ({ children, className = "" }: BodyProps) => (
  <div className={className}>{children}</div>
);
export default Body;
