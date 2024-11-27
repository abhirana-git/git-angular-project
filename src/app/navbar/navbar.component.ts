import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logoUrl = "https://zgbrjqmrzpxzmtybzwpc.supabase.co/storage/v1/object/public/images/images/logo.png";
}
