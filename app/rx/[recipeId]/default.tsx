import RecipeEditor from "../_components/RecipeEditor/RecipeEditor";

export default function Default({ params }: { params: { path?: any } }) {
  //return null;
  console.log(params);
  const recipe = {} as any;
  return <RecipeEditor recipe={recipe} path={params.path} />;
}
