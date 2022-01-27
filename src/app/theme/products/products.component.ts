import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products/products.service'
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products : any;
  totalItems: number;
  valueKey: string;
  pagesize : number = 5;
  maxSize :number = 4;
  currentPage: number = 0;
  loading: boolean = false;
  constructor(private services: ProductsService) { }

  async ngOnInit()
  {
    this.products = await this.services.index(0, 5);
    console.log(this.products)

    const result = <any> await this.services.length();
    this.totalItems = result.data;
  }

  async onPageChange(pageNum: number)
  {
    let skip = (pageNum-1) * 5; 
    this.products = <any[]> await this.services.index(skip, 5);
    console.log(this.products)
  }

  async delete(id: string){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this product!',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Your category is safe!', 'error');
      } else {
          try {
          this.loading = true;
          await this.services.delete(id);
          this.products = <any[]> await this.services.index(0, 5);
          this.loading = false;
          Swal.fire('', 'OK! ', 'success');
        } catch (error) {
          console.log(error)
        }
      }
    });
  }

}
