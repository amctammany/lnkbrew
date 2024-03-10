export type BodyProps = {
  children?: React.ReactNode | React.ReactNode[];
};
export const Body = ({ children }: BodyProps) => (
  <div className="p-2 md:p-4">{children}</div>
);
export default Body;
