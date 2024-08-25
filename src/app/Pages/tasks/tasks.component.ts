import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tasks } from 'src/app/Model/Tasks';
import { ApiDynamicService } from 'src/app/Services/api-dynamic.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public User:any;
  public ListTask : Array<Tasks>;
  public FormularioTask !: FormGroup;
  constructor(
    private authService: ApiDynamicService,
    private readonly fb:FormBuilder 
  ) {
    this.ListTask = new Array<Tasks>();
   }

  ngOnInit(): void {
    this.User = this.authService.getUserData();
    this.initFormTaks();
    this.authService.callServiceGetAnyResponse("Tasks/TaskList",
      (success : any )=>{
        console.log(success);
        success.forEach((element :any) => {
          var task= new Tasks();
          task.Id=element.id
          task.name = element.name
          task.UserName = element.userName
          task.UserId = element.userId
          task.completed =element.completed
          task.description =element.description
          this.ListTask.push(task);
        });
        console.log("this.ListTask");
        console.log(this.ListTask);
        
      },
      (Error : any) =>{
        console.log(Error);
      }

     )

  }

  private initFormTaks ():void{
    this.FormularioTask=this.fb.group({
      name:['', Validators.required],
      description:['',Validators.required]
    })
  }
  validar_Formulario_Add() {
    alert("Entro")
    if(this.FormularioTask.value.name !=" " && this.FormularioTask.value.description != " ")
    {
        var objtask= new Tasks();
        objtask.name =this.FormularioTask.value.name
        objtask.description =this.FormularioTask.value.description
        objtask.completed = false
        objtask.UserId = this.User.userId
 
        
        this.authService.callServiceAnyResponse("Tasks/Add",objtask,
            (success :any) =>{
                
                if(success)
                {
                    window.location.reload();
                }
            },
            (error :any) =>{
                console.log(error)
            }
        )
    }
    else{
        alert("Campos vacios");
    }

  }

  updateTask(item:Tasks){
    item.completed=true;
    this.authService.callServicePutAnyResponse("Tasks/Task",{IdTask:item.Id},item,
        (success :any)=>{
            console.log("Put");
            console.log(success);
            
        },
        (error :any)=>{
            console.log(error);
            
        }
    );
  }

  DeleteTask(item: Tasks){
    let param = {
        id : item.Id,
        userId : item.UserId
    }
    this.authService.callServiceDeleteAnyResponse("Tasks",param,
        (success :any)=>{
            
            if(success)
            {
                window.location.reload();
            }
            
        },
        (error :any)=>{
            console.log(error);
            
        }
    )
  }

  LogOut(){
    this.authService.deleteToken();
    this.authService.deleteUserData();
    window.location.reload();
  }
}
