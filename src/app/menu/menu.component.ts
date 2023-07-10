import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class MenuComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      parent: [0],
      id: [null],
      icon: [null],
      class: [null],
      label: [null, Validators.required],
      items: this.formBuilder.array([]),
    });
  }

  ngOnInit() {}

  resetForm() {
    this.form.reset();
    while (this.items().length > 0) this.items().removeAt(0);
  }

  items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItems() {
    this.items().push(
      this.formBuilder.group({
        parent: [0],
        id: [null],
        icon: [null],
        class: [null],
        label: [null, Validators.required],
        items: this.formBuilder.array([]),
      })
    );
  }

  childItems(itemsIndex: number): FormArray {
    return this.items().at(itemsIndex).get('items') as FormArray;
  }

  addChildItems(itemsIndex: number) {
    this.childItems(itemsIndex).push(
      this.formBuilder.group({
        parent: [0],
        id: [null],
        icon: [null],
        class: [null],
        label: [null, Validators.required],
      })
    );
  }

  deleteItems(index: number) {
    this.items().removeAt(index);
  }

  deleteChildItems(itemsIndex: number, childItemsIndex: number) {
    this.childItems(itemsIndex).removeAt(childItemsIndex);
  }

  // getDataFromApi() {
  //   const dummy = {
  //     itemGroup: 'GA',
  //     categoryId: 1,
  //     categoryItem: 'Kipas',
  //     status: true, //aktif
  //     listSubCategory: [
  //       {
  //         subCategoryId: 2,
  //         subCategoryItem: 'Kipas a',
  //         status: true, //aktif
  //         listItem: [
  //           {
  //             itemType: 'Kipas a-1',
  //             itemBrand: 'MEANWELL',
  //             status: true, //aktif
  //           },
  //         ],
  //       },
  //       {
  //         subCategoryId: 3,
  //         subCategoryItem: 'Kipas b',
  //         status: true, //aktif
  //         listItem: [
  //           {
  //             itemType: 'Kipas b-1',
  //             itemBrand: 'MEANWELL1',
  //             status: true, //aktif
  //           },
  //           {
  //             itemType: 'Kipas b-2',
  //             itemBrand: 'MEANWELL2',
  //             status: true, //aktif
  //           },
  //         ],
  //       },
  //     ],
  //   };
  //   this.setForm(dummy);
  // }

  // setForm(data: any) {
  //   this.resetForm();
  //   data.listSubCategory.forEach((subCategory: any, i: number) => {
  //     this.addSubCategory();
  //     subCategory.listItem.forEach(() => this.addItem(i));
  //   });
  //   this.form.patchValue(data);
  // }
}
