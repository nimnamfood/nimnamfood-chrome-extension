import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRecipeContract, Recipe } from '../recipe';
import { RecipeRepository } from './recipe-repository';

export class RecipeHttpRepository extends RecipeRepository {
  private readonly httpClient = inject(HttpClient);

  override create(recipe: CreateRecipeContract): Observable<Recipe> {
    return this.httpClient.post<Recipe>('/api/recipes', { ...recipe, tagIds: [], ingredients: [] });
  }
}
