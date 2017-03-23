import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    moduleId: module.id,
    templateUrl: 'product-detail.component.html',
})

export class ProductDetailComponent implements OnInit{
    pageTitle: string = 'Product Details';
    product: IProduct;
    errorMessage: string;
    private sub: Subscription;

    constructor( private _route: ActivatedRoute,
                 private _router: Router,
                 private _productService: ProductService) {

    }

    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
                this.pageTitle += `: ${id}`;
                }
            )
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }

    getProduct(id: number) {
        this._productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    

}