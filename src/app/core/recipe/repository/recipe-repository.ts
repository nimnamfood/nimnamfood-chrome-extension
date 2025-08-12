import type { Observable } from 'rxjs';
import { CreateRecipeContract, Recipe } from '../recipe';

export abstract class RecipeRepository {
  abstract create(recipe: CreateRecipeContract): Observable<Recipe>;
}
