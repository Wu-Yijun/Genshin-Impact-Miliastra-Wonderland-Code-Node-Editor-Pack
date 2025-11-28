declare interface EnumList {
  Version: string;
  Author: String;
  Date: String;
  EnumList: {
    name: string;
    id: number;
    varClassBase: number;
    items: Record<number, string>;
  }[];
}