import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
var moment = require("moment");

@inject(Service)
export class List {
  constructor(service) {
    this.service = service;
    this.showData = false;
  }

  async bind(context) {
    this.context = context;
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };
  search() {
    this.searching();
  }

  activate() {}

  tableData = [];

  searching() {
    var args = {
      dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
    };

    this.service.search(args).then((result) => {
      this.data = result.data;

      this.RawMaterialBeginningBalancePrice =
        result.data.RawMaterialBeginningBalancePrice.toLocaleString("en-EN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      this.RawMaterialReceiptPurchasePrice =
        result.data.RawMaterialReceiptPurchasePrice.toLocaleString("en-EN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      this.RawMaterialExpendPrice =
        result.data.RawMaterialExpendPrice.toLocaleString("en-EN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      this.RawMaterialAvailablePrice =
        result.data.RawMaterialAvailablePrice.toLocaleString("en-EN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      this.RawMaterialFinalInventoryPrice =
        result.data.RawMaterialFinalInventoryPrice.toLocaleString("en-EN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      this.costOfGoodsSold = this.RawMaterialExpendPrice;
      //get show data or not by checking the length of the data
      this.showData = Object.keys(this.data).length > 0;
    });
  }

  reset() {
    this.dateTo = "";
    this.data = {};
    this.showData = false;
  }

  ExportToExcel() {
    let args = {
      dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
    };

    this.service.generateExcel(args);
  }
}
