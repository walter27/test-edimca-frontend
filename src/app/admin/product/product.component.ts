import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../iterface/iterfaces';
import { NgForm } from '@angular/forms';

import { Message } from 'primeng/api';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  cols!: any[];
  listProduct: Product[] = [];
  product: Product = {
    name: '',
    description: '',
    price: 0
  };
  showMessageSuccess: boolean = false;
  showMessageError: boolean = false;
  displayDialog: boolean = false;
  messageComponente: Message[] = [];


  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'price', header: 'Price' },
      { field: '', header: 'Actions' }
    ];
    this.getProducts();
  }

  getProducts() {
    this.productService.listProduct().subscribe(
      {
        next: (resp) => {
          this.listProduct = resp;
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }


  addProduct(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.productService.addProduct(this.product).subscribe(
      {
        next: (resp) => {
          this.showMessageSuccess = true;
          this.displayDialog = false;
          form!.reset();
          this.getProducts();
          this.displayMessage();
          this.product = {
            name: '',
            description: '',
            price: 0
          };
        },
        error: (error) => {
          this.showMessageError = true
          this.displayDialog = false;
          this.displayMessage();
          form!.reset();
        }
      }
    )
  }

  updateProduct(productTable: Product) {
    this.displayDialog = true;
    this.product = {
      id: productTable.id,
      name: productTable.name,
      description: productTable.description,
      price: productTable.price
    };

  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id!).subscribe(
      {
        next: (resp) => {
          this.getProducts();
          this.showMessageSuccess = true;
          this.displayMessage();

        },
        error: (error) => {
          this.showMessageError = true
          this.displayMessage();

        }
      }
    )
  }

  closeDialog() {
    this.product = {
      name: '',
      description: '',
      price: 0
    };
  }

  showDialog() {
    this.product = {
      name: '',
      description: '',
      price: 0
    };
    this.displayDialog = true;
  }

  enableButton(): boolean {
    if (this.product.name!.length > 0 && this.product.description!.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  displayMessage() {
    if (this.showMessageSuccess) {
      this.messageComponente = [
        { severity: 'success', summary: '', detail: 'Successfully process.' },
      ];
    }
    if (this.showMessageError) {
      this.messageComponente = [
        { severity: 'error', summary: '', detail: 'Error in the process.' },
      ];
    }

    setTimeout(() => {
      this.messageComponente = [];
    }, 2000);
  }



}
