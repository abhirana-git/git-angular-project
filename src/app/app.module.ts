import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterLink, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ListRecipesComponent } from "./recipes/list-recipes/list-recipes.component";
import { NgFor } from "@angular/common";
import { AddRecipeComponent } from "./recipes/add-recipe/add-recipe.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { routes } from "./app.routes";
import { ViewRecipesComponent } from "./recipes/view-recipes/view-recipes.component";
import { LoginComponent } from "./authentication/login/login.component";
import { HomeComponent } from "./home/home.component";
import { SignupComponent } from "./authentication/signup/signup.component";
import { HttpinterceptorService } from "./service/httpinterceptor.service";

@NgModule({
    declarations: [
        NavbarComponent,
        ListRecipesComponent,
        AddRecipeComponent,
        AppComponent,
        ViewRecipesComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent
      ],
      imports: [
        RouterLink,
        NgFor,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes)
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpinterceptorService,
          multi: true
        }
      ],
      bootstrap: [AppComponent]
})

export class AppModule{
}