import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
const UnitLoader = require("../../../../../../loader/garment-units-loader");
const StockLoader = require("../../../../../../loader/garment-leftover-warehouse-stock-distinct-loader");
import { Service } from "../service";

@inject(Service)
export class Item {
  @bindable selectedUnit;
  @bindable selectedStock;
  @bindable selectedUom;

  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.items = context.context.items;

    this.error = context.error;
    this.options = context.options;

    this.isEdit = context.context.options.isEdit && this.data.Id > 0;

    if (this.data.Unit) {
      this.selectedUnit = this.data.Unit;
    }

    if (this.data.PONo) {
      this.selectedStock = {
        //   PONo: this.data.PONo,
        NoView: this.data.PONo + " - " + this.data.ReceiptNo,
      };
    }

    // if (this.data.Stocks) {
    //   this.uomItems = [""].concat(
    //     this.data.Stocks.map((d) => (d.Uom || {}).Unit)
    //   );
    // }

    // if (this.data.Uom) {
    //   this.selectedUom = (this.data.Uom || {}).Unit || "";
    // } else {
    //   this.selectedUom = "";
    // }
  }

  uomItems = [""];

  get unitLoader() {
    return UnitLoader;
  }

  @computedFrom("data.Unit")
  get stockLoaderFilter() {
    return {
      UnitFromId: (this.data.Unit || {}).Id || 0,
      [`Items.Any(RemainingQuantity > 0)`]: true,
    };
  }

  get stockLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify(this.stockLoaderFilter),
      };

      return this.service.searchStock(info).then((result) => {
        var noList = [];
        for (var a of result.data) {
          var dup = noList.find((d) => d.ReceiptItemId == a.ReceiptItemId);
          if (!dup) {
            var selected = this.items.find(
              (x) => x.data.ReceiptItemId == a.ReceiptItemId
            );

            if (!selected) {
              a.NoView = a.PONo + " - " + a.ReceiptNo;
              noList.push(a);
            }
          }
        }

        return noList;
      });
    };
  }

  get stockLoaderSelect() {
    return ["PONo"];
  }

  selectedUnitChanged(newValue) {
    this.data.Unit = newValue;
    this.selectedStockViewModel.editorValue = "";
    this.selectedStock = null;
  }

  selectedStockChanged(newValue, oldValue) {
    this.data.PONo = null;
    this.data.Stocks = null;
    // this.uomItems = [""];
    this.selectedUom = null;

    if (newValue) {
      this.data.PONo = newValue.PONo;
      this.data.RemainingQuantity = newValue.RemainingQuantity;
      this.data.Uom = newValue.Uom;
      this.data.BasicPrice = newValue.BasicPrice;
      this.data.ReceiptId = newValue.ReceiptId;
      this.data.ReceiptItemId = newValue.ReceiptItemId;
      this.data.ReceiptNo = newValue.ReceiptNo;
      //   this.service
      //     .searchStock({
      //       filter: JSON.stringify({
      //         PONo: this.data.PONo || "-",
      //         UnitId: this.data.Unit.Id,
      //       }),
      //     })
      //     .then((result) => {
      //       if (result.statusCode == 200) {
      //         const uomUnits = this.context.context.items
      //           .filter(
      //             (i) =>
      //               (i.data.Unit || {}).Id == this.data.Unit.Id &&
      //               i.data.PONo == this.data.PONo &&
      //               i.data.Uom != null
      //           )
      //           .map((i) => i.data.Uom.Unit);

      //         this.data.Stocks = result.data.filter(
      //           (d) => uomUnits.findIndex((u) => u == (d.Uom || {}).Unit) < 0
      //         );
      //         this.uomItems = [""].concat(
      //           this.data.Stocks.map((d) => (d.Uom || {}).Unit)
      //         );
      //       }
      //     });
    }
  }

  //   selectedUomChanged(newValue) {
  //     if (newValue) {
  //       this.data.Stock = this.data.Stocks.find((d) => d.Uom.Unit == newValue);

  //       if (this.data.Stock) {
  //         const existingItem = (
  //           this.context.context.options.existingItems || []
  //         ).find((i) => i.StockId == this.data.Stock.Id) || { Quantity: 0 };
  //         this.data.Stock.Quantity += existingItem.Quantity;

  //         this.data.StockId = this.data.Stock.Id;
  //         this.data.Quantity = this.data.Stock.Quantity;
  //         this.data.Uom = this.data.Stock.Uom;
  //         this.data.BasicPrice = this.data.Stock.BasicPrice;
  //       }
  //     } else {
  //       this.data.Stock = null;
  //       this.data.StockId = 0;
  //       this.data.Quantity = 0;
  //       this.data.Uom = null;
  //     }
  //   }
}
