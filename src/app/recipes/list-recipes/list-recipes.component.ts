import { Component, OnInit, signal } from '@angular/core';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../service/recipe.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-recipes',
  standalone: false,
  templateUrl: './list-recipes.component.html',
  styleUrl: './list-recipes.component.css'
})
export class ListRecipesComponent implements OnInit {
  selectedRating:number=0;
  recipes= signal<Recipe[]|undefined>(undefined);
  ingredients:any;
  constructor(private httpservice: RecipeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.onSelectView();
  }
  
   onSelectView(){
    this.httpservice
      .getAll()
      .subscribe({
        next: (val) => {
          this.recipes.set(val);
          console.log('Transformed recipes:', this.recipes);
        },
        error: (err) => console.error('Error fetching recipes:', err),
      });
   }

   GetRecipeById(recipeId:number|string){
    this.router.navigate(['recipe/view', recipeId]);
   }
  }
