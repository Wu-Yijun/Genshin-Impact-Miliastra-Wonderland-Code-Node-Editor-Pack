declare interface EnumList {
  Version: string;
  Author: String;
  Date: String;
  EnumList: {
    name: string;
    id: number;
    indexOfConcrete: number;
    items: Record<number, string>;
  }[];
}