import { Component, OnInit, signal } from '@angular/core';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../service/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-recipes',
  standalone: false,
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.css']
})
export class ListRecipesComponent implements OnInit {
  selectedRating: number = 0;
  recipes = signal<Recipe[] | undefined>(undefined); // Original recipes
  filteredRecipesList = signal<Recipe[] | undefined>(undefined); // Filtered recipes
  ingredients: string[] = [];
  ratings = [1, 2, 3, 4, 5];
  selectedIngredient: string = '';

  constructor(
    private httpservice: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onSelectView();
  }

  onSelectView() {
    this.httpservice.getAll().subscribe({
      next: (val) => {
        this.recipes.set(val); 
        this.filteredRecipesList.set(val); 
        this.extractIngredients(val);
        console.log('Transformed recipes:', this.recipes());
      },
      error: (err) => console.error('Error fetching recipes:', err),
    });
  }

  extractIngredients(recipes: Recipe[]) {
    const allIngredients = recipes.flatMap((recipe) => recipe.ingredients);
    this.ingredients = [...new Set(allIngredients)]; 
  }

  GetRecipeById(recipeId: number | string) {
    console.log('recipe id', recipeId);
    this.router.navigate(['recipe/view', recipeId]);
  }

  onIngredientChange() {
    if (this.selectedIngredient === '') {
      this.filteredRecipesList.set(this.recipes());
    } else {
      const filtered = this.recipes()?.filter((recipe) =>
        recipe.ingredients.includes(this.selectedIngredient)
      );
      this.filteredRecipesList.set(filtered);
    }
  }
}
