import { Metadata } from "next";
import { getStyles } from "./queries";
import { StylesList } from "./_components/StylesList";
export const metadata: Metadata = {
  title: "LNK Styles",
};
export default async function StylesIndex() {
  const styles = await getStyles();
  return <StylesList styles={styles} />;
}
