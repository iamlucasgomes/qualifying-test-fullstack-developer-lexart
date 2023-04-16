import IAdvert from "./IAdvert";

export default interface IProduct extends IAdvert {
  category: string;
  platform: string;
}