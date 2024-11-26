import { Routes } from '@angular/router';
import { ListRecipesComponent } from './recipes/list-recipes/list-recipes.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { ViewRecipesComponent } from './recipes/view-recipes/view-recipes.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './authentication/signup/signup.component';

export const routes: Routes = [
    {
        path:'recipe/list',
        component: ListRecipesComponent
      },
      {
        path:'recipe/add',
        component: AddRecipeComponent
      },
      {
        path:'recipe/view/:id',
        component: ViewRecipesComponent
      },
      {
        path:'recipe/login',
        component:LoginComponent
      },
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'recipe/signup',
        component:SignupComponent
      }
];
