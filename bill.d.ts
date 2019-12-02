/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The bill ID is the identifier for this bill from a non-LOKE system, typically the remote service's bill ID.
 */
export type UniqueIDForThisBill = string;
/**
 * Currency used on this bill.
 */
export type BillCurrency = "AUD" | "NZD" | "SGD" | "GBP";
/**
 * Can tips be attached to this bill
 */
export type TipsAllowed = boolean;
/**
 * The ID of the product item is recommended for merchant orders, but mandatory for customer orders
 */
export type IDOfTheProductItem = string;
export type DisplayNameOfTheProductOnThisLineItem = string;
/**
 * The cost is represented in the lowest denomination (eg cents). For discounts this should be negative. Excludes the cost of options.
 */
export type TheCostOfASingleInstanceOfThisItem = number;
/**
 * The tax is represented in the lowest denomination (eg cents). For discounts this should be negative. Provided mainly for backwards compatibility.
 */
export type TheTaxOfASingleInstanceOfThisItem = number | null;
export type TheQuantityOfItemsOrdered = number;
export type LineItemType = "discount" | "adjustment" | "item";
export type DisplayNameOfTheOptionVariationEtc = string;
/**
 * The cost is represented in the lowest denomination (eg cents). For discounts this should be negative.
 */
export type TheCostOfASingleInstanceOfThisItem1 = number;
/**
 * Optionally provide a reference to the record of this payment to another system.
 */
export type ReferenceID = string;

/**
 * Represents a bill for items to be paid by one or more customers
 */
export interface Bill {
  id: UniqueIDForThisBill;
  /**
   * Table number if applicable.
   */
  table?: string;
  currency: BillCurrency;
  tipsAllowed?: TipsAllowed;
  /**
   * List of items associated with this bill. *NOTE: may include discounts.*
   */
  items: {
    id?: IDOfTheProductItem;
    name: DisplayNameOfTheProductOnThisLineItem;
    amount: TheCostOfASingleInstanceOfThisItem;
    tax?: TheTaxOfASingleInstanceOfThisItem;
    quantity: TheQuantityOfItemsOrdered;
    type?: LineItemType;
    subItems?: {
      name: DisplayNameOfTheOptionVariationEtc;
      amount: TheCostOfASingleInstanceOfThisItem1;
    }[];
  }[];
  /**
   * Total amount that must be paid on this bill, ignoring any payments currently made. *Inclusive of any tax.*
   */
  total: number;
  /**
   * Tax amount included on bill. This is highly recommended as it provided better feedback to the customer, but not required.
   */
  tax?: null | number;
  /**
   * Balance remaining on this bill. This will be the total, minus any payments already made on the bill.
   */
  balance: number;
  /**
   * Any existing payments made on this bill.
   */
  payments: {
    /**
     * Method of payment or payment label
     */
    name: string;
    /**
     * The total amount paid on this payment instance *inclusive of tips*. Successful payments should be listed as a positive integer. Reversals as a negative integer.
     */
    total: number;
    refId?: ReferenceID;
    /**
     * Tip included in in this payment.
     */
    tip?: number;
  }[];
  /**
   * Timestamp this bill was created.
   */
  created: string;
  /**
   * Timestamp this bill was last updated.
   */
  updated: string;
  /**
   * Timestamp this bill was completed (if applicable).
   */
  completed?: string;
}
