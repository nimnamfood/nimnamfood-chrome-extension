export type Recipe = {
  id: string;
  name: string;
};

export type CreateRecipeContract = {
  name: string;
  portionsCount: number;
  instructions: string;
  illustrationId: string;
};
