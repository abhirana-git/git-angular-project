import { Routes } from '@angular/router';
import { ListRecipesComponent } from './recipes/list-recipes/list-recipes.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { ViewRecipesComponent } from './recipes/view-recipes/view-recipes.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:'recipe/list',
        component: ListRecipesComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'recipe/add',
        component: AddRecipeComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'recipe/view/:id',
        component: ViewRecipesComponent,
        canActivate:[AuthGuard]
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
