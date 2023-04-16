import IAdvert from "./IAdvert";

export default interface IResponseService {
  id: number,
  searchTerm: string,
  platform: string,
  category: string,
  adverts: IAdvert[]
}