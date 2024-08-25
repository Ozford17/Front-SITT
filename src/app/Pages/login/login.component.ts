import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiDynamicService } from 'src/app/Services/api-dynamic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public User :string  ;
  public Password :string;
  public Formulario !: FormGroup;
  constructor(
    private authService: ApiDynamicService,
    private router:Router,
    private readonly fb:FormBuilder ,
  ) {
    this.User="";
    this.Password ="";
   }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm ():void{
    this.Formulario=this.fb.group({
      usuario:['', Validators.required],
      password:['',Validators.required]
    })
  }
  async onLogin(): Promise<void> {
    if(this.Formulario.value.usuario != '' && this.Formulario.value.password != ''  )
    {
        (await this.authService.login(this.Formulario.value.usuario, this.Formulario.value.password)).subscribe(
            (response: any) => {
                console.log(response);
                if (response.accessToken) {
                    this.authService.setToken(response.accessToken);
                    console.log('Login exitoso y token guardado');
                    
                    this.authService.setUserData(response.user);
                    this.router.navigate(['/Task']);
                } else {
                    console.log('Login fallido');
                }
            },
            (error:any) => {
                console.error('Error al realizar el login', error);
            }
        );

    }
  }

}
