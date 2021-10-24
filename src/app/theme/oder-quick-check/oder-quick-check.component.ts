import { Component, OnInit } from '@angular/core';
import {OrderQuickAccessService} from './../../services/order-quick/order-quick-access.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-oder-quick-check',
  templateUrl: './oder-quick-check.component.html',
  styleUrls: ['./oder-quick-check.component.scss']
})
export class OderQuickCheckComponent implements OnInit {

  Status = [];
  Keyvalue : boolean = false;
  NameStatus : any[];
  firstFormGroup : FormGroup;
  isSubmited : boolean = false;
  check : boolean = false
  Order = [];
  Quantity : number;
  PerkItem = [];
  PerlIncludesItem =[];
  currentOrder :string;
  CheckEmail : boolean = true;
  current_email :string = null;
  current_status : number;
  loading : boolean 
  constructor(private quick_check: OrderQuickAccessService, private formBuilder : FormBuilder, private titleService: Title
) { 
  this.titleService.setTitle("Welcome || HiQ - Order Quick Check");
  this.loading = true;
}

  ngOnInit(): void {
    document.body.setAttribute("style" , "background-color : #fff ")
    this.quick_check.getstatus()
        .subscribe(
          status =>{
            this.NameStatus = status;
          }
          
          )
    this.CreateForm();
  }

  CreateForm(){
    this.firstFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }


  ChangeValues(id , index){
  
    
    this.PerkItem[index].state = (this.PerkItem[index].state) ? false : true;
  
    this.current_status = index;

  }
  get f() { return this.firstFormGroup.controls; }

  async onSubmit(){
    
    this.isSubmited = true;
    if(this.firstFormGroup.invalid){
      return ;
    }
   this.loading = true;
   await  this.quick_check.FindOrder(this.f.email.value)
        .subscribe(data =>{
           this.Order = data;
           console.log(this.Order);
          if(this.Order.length > 0){
            this.CountOrder();

         
          }
        },
        err =>{
          swal.fire('Oh no!', 'Email is not existed!', 'error');

        }
        )
    
  }

  
  CountOrder(){      
    this.PerkItem = [];
    this.Order.forEach(order =>{           
      let perkitem=[];   
      //lay id cua orrder
       perkitem["number"] =order["number"]; 
       //lay status cua order de quyet dinh mau
       perkitem["status"] =order["status"];
       perkitem["state"] = false;
       
       //lay thong tin trackin info website
        let trackinginfo = order["trackingInfo"];
        perkitem["tracking"] = JSON.parse(trackinginfo);
        //lay mau cua order
        this.NameStatus.forEach((element)=>{
          if(element["id"] === perkitem["status"]){
            perkitem["status"] = element["name"];
            perkitem["color"] = element["color"];

          }
        })          
        //loop order perk
          let Perkchild = [];
          order["orderPerks"].forEach(perk =>{                   
            let childrenPerk ={"quantity": perk["quantity"], "name": perk["perk"]["name"], "options": []}                  
            let chilofchileArray = []                 
            perk["orderPerkItems"].forEach((item=>{                     
              let childofchild = {"quantity": item["quantity"], "name": item["itemOption"]["name"]}                       
              chilofchileArray.push(childofchild);                  
             })) 
              
              childrenPerk["options"]=(chilofchileArray);  
              Perkchild.push(childrenPerk);
              // let temp = [childrenPerk];                           
              // perkitem["option"] = temp        
                       
            })  
               perkitem["option"] = Perkchild;        
             
               this.PerkItem.push(perkitem);            
              })   
              
      console.log("Perk", this.PerkItem);
             
    }



}
