import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../service/recipe.service';
import { Feedback } from '../../model/feedback.model';
import { FeedbackService } from '../../service/feedback.service';
import { AuthenticateService } from '../../service/authenticate.service';
import { SignupService } from '../../service/signup.service';
import { map } from 'rxjs';

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
  id:number=0;
  users: { fullname: string; userId: string }[] = []
  isFeedbackGiven:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private feedbackService: FeedbackService,
    private authService: AuthenticateService,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.signupService.getAllUsers()
    .subscribe({
      next:(val) =>{
        if(val){
          val.forEach((user) =>
            this.users.push({ fullname: user.fullname, userId: user.id })
          );
        }
        else{
          this.users=[{fullname:'',userId:''}]
        }
      }
    })
    this.feedbacksForRecipeById(this.id);
    this.recipeService.getById(this.id).subscribe({
      next: (val) => {
        this.recipe.set(val);
      },
    });
  }

  getFullname(userId:string){
    return this.users.find(user => user.userId === userId)?.fullname;
  }

  selectRating(selectedRating: number): void {
    this.newRating = selectedRating;
  }

  feedbacksForRecipeById(recipeId: number) {
    this.feedbackService.getAll().subscribe({
      next: (val) => {
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
    };
  }

  saveFeedback():void {
    if(!this.authService.isLoggedIn()){
      alert('Login to give rating and feedback.')
      return;
    }
    if(this.feedback()){
      const loggedInId = this.authService.userId??'';
      const isRatingAlreadyGiven = this.feedback().find(x => x.userId == loggedInId);
      if(loggedInId != null && loggedInId != '' && isRatingAlreadyGiven){
        this.newFeedback='';
        this.newRating=0;
        return alert('You have already provided the rating and comment.');
        }
    }
    this.feedbackService.addFeedback(this.newFeedbackForAdd());
    this.newFeedback='';
    this.newRating=0;
    this.feedbacksForRecipeById(this.id);
  }
}
