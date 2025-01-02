import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../service/recipe.service';
import { Feedback } from '../../model/feedback.model';
import { FeedbackService } from '../../service/feedback.service';
import { AuthenticateService } from '../../service/authenticate.service';
import { UrlSetupConfigService } from '../../service/url-setup-config.service';

@Component({
  selector: 'app-view-recipes',
  standalone: false,
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css',
})
export class ViewRecipesComponent implements OnInit {
  newRating?: number;
  newFeedback?: string;
  feedback = signal<Feedback[]>([]);
  recipe = signal<Recipe | undefined>(undefined);
  stars: number[] = [1, 2, 3, 4, 5];
  id:string='';
  users: { fullname: string; userId: string }[] = []
  isFeedbackGiven:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private feedbackService: FeedbackService,
    private authService: AuthenticateService,
    private apiurlsetup: UrlSetupConfigService
  ) {}

  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id')??'';
    this.apiurlsetup.setApiUrl(`Recipe/GetbyId`);
    
    this.recipeService.getRecipeById(parseInt(this.id)).subscribe({
      next: (val) => {
        this.recipe.set(val);
      },
    });
    this.feedbacksForRecipeById(this.id);
  }

  getFullname(userId:string){
    return this.feedback().find(user => user.userId === userId)?.name;
  }

  selectRating(selectedRating: number): void {
    this.newRating = selectedRating;
  }

  feedbacksForRecipeById(recipeId: string) {
    this.apiurlsetup.setApiUrl(`Feedback/GetByRecipeId/${recipeId}`);
    this.feedbackService.getAllFeedback().subscribe({
      next: (val) => {
        console.log('let see inside get all api data', val);
        const filteredFeedback: Feedback[] = val.filter(
          (feedback) => feedback.recipeId == recipeId
        );
        this.feedback.set(filteredFeedback);
      },
    });
  }

 newFeedbackForAdd(): Feedback {
    return {
      recipeId: this.recipe()?.id ?? 0,
      userId: this.authService.userId??'',
      rating: this.newRating ?? '',
      feedback: this.newFeedback ?? '',
      name:''
    };
  }

  saveFeedback():void {
    if(!this.authService.isLoggedIn()){
      alert('Login to give rating and feedback.')
      return;
    }
    this.apiurlsetup.setApiUrl('Feedback/Add');
    this.feedbackService.addFeedback(this.newFeedbackForAdd()).subscribe({
        next: (val:any) => {
          if (val._statusCode === 200) {
            this.feedback.set(val);
            alert('Feedback added successfully!');}
            else if (val._statusCode === 400) {
            alert('Already given feedback!');
          }
        },
        error: (err) => {
          alert('An unexpected error occurred. Please try again later.');
        }
      });
    this.newFeedback='';
    this.newRating=0;
    this.feedbacksForRecipeById(this.id)
  }
}
