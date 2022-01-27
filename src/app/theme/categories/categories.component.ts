import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../services/categories/categories.service';
import {transition, trigger, style, animate} from '@angular/animations';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class CategoriesComponent implements OnInit {

  totalItems: number;
  valueKey: string;
  pagesize : number = 5;
  maxSize :number = 4;
  currentPage: number = 0;
  categories: any;
  isSubmit: any;
  loading: boolean = false;
  constructor(private services: CategoriesService) { }

  formInput: any;
  formChild: any;
  current_index :number = 0;
  current_children:number = 0;
  async ngOnInit() {
    this.loading = true;
    this.categories = <any> await this.services.index(0, 5);
    this.loading = false;
    console.log(this.categories);
    const length = <any> await this.services.length();
    this.totalItems = length.data;
    this.formInput = {
      name: ""
    }  
    this.formChild = {
      name: "",
      parentID: ""
    }
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  async onPageChange(pageNum: number)
  {
    let skip = (pageNum-1) * 5; 
    this.categories = <any[]> await this.services.index(skip, 5);
  }

  async create(event){
    try {
      this.loading = true;
      await this.services.create(this.formInput);
      this.categories = <any[]> await this.services.index(0, 5)
      this.loading = false;
      this.closeMyModal(event)
    } catch (error) {
      console.log(error);
    }
  }

  open_addchildren(event, i){
    this.openMyModal(event);
    this.current_index = i;
  }
  async create_child(event){
    try {
      this.loading = true;
      this.formChild.parentID = this.categories[this.current_index]["_id"]
      const children =<any> await this.services.create(this.formChild);
      this.categories[this.current_index].childs.push(children.data);
      this.loading = false;
      this.closeMyModal(event)
    } catch (error) {
      console.log(error)
    }
  }

  async edit(event, id, i){
    try {
      this.current_index = i;
      this.loading = true;
      const result = <any> await this.services.show(id);
      this.formInput.name = result.data.name;
      this.openMyModal(event);
      this.loading = false;
    } catch (error) {
      
    }
  }

  async Edit_category(event) {
    try {
      
      this.loading = true;
      const id = this.categories[this.current_index]["_id"];
      console.log("im hêre")
      const result = <any> await this.services.update(id, this.formInput);
      console.log("result", result);
      this.categories[this.current_index].name = result.data.name
      this.closeMyModal(event)
      this.loading = false;
    } catch (error) {
      console.log(error)
    }
  }

  delete(categoryID, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this category!',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Your category is safe!', 'error');
      } else {
          this.loading = true;
          try {
            const result = <any> await this.services.delete(categoryID);
            if(result.data)
            {
              Swal.fire('', 'OK! ', 'success');
            }
            else
            {
              Swal.fire('', 'Can not delete category!', 'error');
            }
            this.categories = <any> await this.services.index(0, 5);
            this.loading = false;   
          } catch (error) {
            console.log(error)
          }
         
        }
    });
  }
  
  async open_edit_child(event: any, i: any, index_child: any){
    this.current_index = i
    this.current_children = index_child;
    const id = this.categories[this.current_index]["childs"][this.current_children]["_id"];
    try {
      const result = <any> await this.services.show(id);
      this.formChild.name = result.data.name;
      this.loading = false;
      this.openMyModal(event);

    } catch (error) {
      
    }
  }

  async Edit_child(event){
    const id = this.categories[this.current_index]["childs"][this.current_children]["_id"];
    try {
      this.loading = true;
      delete this.formChild["parentID"]
      const result = <any> await this.services.update(id, this.formChild);
      this.categories[this.current_index]["childs"][this.current_children]["name"] = result.data.name;
      this.loading = false;
      this.closeMyModal(event)
    } catch (error) {
      console.log(error);
      this.loading = false;
    }    
  }
}
