export type BodyProps = {
  children?: React.ReactNode | React.ReactNode[];
};
export const Body = ({ children }: BodyProps) => (
  <div className="">{children}</div>
);
export default Body;
