import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      itemGroup: [null],
      categoryId: [{ value: null, disabled: true }],
      categoryItem: [null],
      status: [null],
      listSubCategory: this.formBuilder.array([]),
    });
  }

  resetForm() {
    this.form.reset();
    while (this.listSubCategory().length > 0) this.listSubCategory().removeAt(0);
  }

  listSubCategory(): FormArray {
    return this.form.get('listSubCategory') as FormArray;
  }

  listItem(subCategoryIndex: number): FormArray {
    return this.listSubCategory().at(subCategoryIndex).get('listItem') as FormArray;
  }

  addSubCategory() {
    this.listSubCategory().push(
      this.formBuilder.group({
        subCategoryId: [{ value: null, disabled: true }],
        subCategoryItem: [''],
        status: [true],
        listItem: this.formBuilder.array([]),
      })
    );
  }

  deleteSubCategory(index: number) {
    this.listSubCategory().removeAt(index);
  }

  addItem(subCategoryIndex: number) {
    this.listItem(subCategoryIndex).push(
      this.formBuilder.group({
        itemId: [{ value: null, disabled: true }],
        itemType: [''],
        itemBrand: [''],
        status: [true],
      })
    );
  }

  duplicateItem(subCategoryIndex: number, itemIndex: number) {
    this.listItem(subCategoryIndex).insert(itemIndex, this.listItem(subCategoryIndex).at(itemIndex));
  }

  deleteItem(subCategoryIndex: number, itemIndex: number) {
    this.listItem(subCategoryIndex).removeAt(itemIndex);
  }

  getDataFromApi() {
    const dummy = {
      itemGroup: 'GA',
      categoryId: 1,
      categoryItem: 'Kipas',
      status: true, //aktif
      listSubCategory: [
        {
          subCategoryId: 2,
          subCategoryItem: 'Kipas a',
          status: true, //aktif
          listItem: [
            {
              itemType: 'Kipas a-1',
              itemBrand: 'MEANWELL',
              status: true, //aktif
            },
          ],
        },
        {
          subCategoryId: 3,
          subCategoryItem: 'Kipas b',
          status: true, //aktif
          listItem: [
            {
              itemType: 'Kipas b-1',
              itemBrand: 'MEANWELL1',
              status: true, //aktif
            },
            {
              itemType: 'Kipas b-2',
              itemBrand: 'MEANWELL2',
              status: true, //aktif
            },
          ],
        },
      ],
    };
    this.setForm(dummy);
  }

  setForm(data: any) {
    this.resetForm();
    data.listSubCategory.forEach((subCategory: any, i: number) => {
      this.addSubCategory();
      subCategory.listItem.forEach(() => this.addItem(i));
    });
    this.form.patchValue(data);
  }
}
