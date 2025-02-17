import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // ✅ Importation du RouterModule
  template: `
    <h1>Application TodoList</h1>
    <router-outlet></router-outlet> <!-- ✅ Permet l'affichage des composants -->
  `
})
export class AppComponent { }
