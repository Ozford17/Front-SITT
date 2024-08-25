import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { TasksComponent } from './Pages/tasks/tasks.component';
import { AuthGuard } from './Commons/Guards/auth.guard';

const routes: Routes = [
  { path: 'Task', component:TasksComponent, canActivate: [AuthGuard]},
  { path: '', component:LoginComponent},
  { path:'**', redirectTo:'', pathMatch:'full'},
  
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
