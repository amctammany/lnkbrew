import { Metadata } from "next";
import { getStyles } from "./queries";
import { StylesList } from "./_components/StylesList";
import { StyleSearch } from "./_components/StyleSearch";
export const metadata: Metadata = {
  title: "LNK Styles",
};
export default async function StylesIndex() {
  const styles = await getStyles();
  return <StyleSearch styles={styles} />;
}
