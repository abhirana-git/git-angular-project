import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Recipe } from '../model/recipe.model';
import { UrlSetupConfigService } from './url-setup-config.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService extends CommonService<Recipe> {
  constructor(apiurlsetup: UrlSetupConfigService, httpclient: HttpClient) {
    super(httpclient, apiurlsetup);
  }

  getAllRecipe() {
    return this.getAll();
  }

  addRecipe(model: Recipe) {
    return this.add(model);
  }

  getRecipeById(id: number) {
    return this.getById(id);
  }
}
