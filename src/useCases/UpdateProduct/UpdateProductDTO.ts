export interface IUpdateProductRequestDTO {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  category?: string;
  price?: number;
  units?: number;
}
