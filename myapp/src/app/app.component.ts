import { Component } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cwh-todo-list';
  // input1 : FormControl;
  // input2 : FormControl;
  inputForm!: FormGroup;
  ans1 ?: any="";
  ans2?: any="";
  st1?:any;
  st2?:any;
  
  constructor(private formBuilder: FormBuilder){
    
  //  setTimeout(() => {
  //    this.title= "Changed Title"
  //  }, 2000);
  
  }

  ngOnInit():void{
    this.inputForm = this.formBuilder.group({
      input1: '',
    input2 :''
  });
  }
  get f(){
    return this.inputForm?.controls;
  }
  submit(){
     this.ans1 = this.f['input1'].value;
     this.ans2 = this.f['input2'].value;
    this.st1=parseInt(this.ans1.substring(4,5))
    this.st2=parseInt(this.ans2.substring(4,5))
    console.log(this.st1,this.st2)
  }
  
}
