import { Injectable } from '@angular/core';
import {STEPS} from './../../../models/Step.model';
@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  workflow =[
    {step : STEPS.start , status: false },
    {step : STEPS.info, status: false},
    {step: STEPS.permisson, status: false},
    {step: STEPS.finished, status: false}
  ]
  constructor() { }
  checkStep(step: string){
   let isMeet : boolean = false;
   for(let i = 0; i < this.workflow.length && !isMeet; i++)
   {
      if(!this.workflow[i].status && this.workflow[i].step !== step){
        return false;
      }
      if(this.workflow[i].step === step ){
        return true;
      }

   }
  }

  getStep(value: string){
    this.workflow.forEach((element)=>{
      if(element.step === value){
        return element.status;
      }
    })
  }
  setStep(value: string, status: boolean){
    this.workflow.forEach((element)=>{
      if(element.step === value){
        element.status = status
      }
    })
  }
}
