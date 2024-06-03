import { StyleDisplay } from "../_components/StyleDisplay";
import { getStyle } from "../queries";
type StyleDisplayPageProps = {
  params: {
    identifier: string;
  };
};
export function generateMetadata({ params }: StyleDisplayPageProps) {
  return {
    title: `LNK Style: ${params.identifier}`,
  };
}

export default async function StyleDisplayPage({
  params: { identifier },
}: StyleDisplayPageProps) {
  const style = await getStyle(identifier);
  return <StyleDisplay style={style} />;
}
