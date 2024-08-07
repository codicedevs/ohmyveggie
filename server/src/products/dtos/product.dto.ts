import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsMongoId,
} from "class-validator";
import { Category } from "src/categories/schemas/category.schema";

export class ProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsArray()
  @IsMongoId()
  categories: string[];

  @IsNumber()
  countInStock: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  categories?: Category[];

  @IsOptional()
  @IsNumber()
  countInStock?: number;
}

export class CreateProductDto {
  @IsString({ message: "El nombre debe ser una cadena de caracteres." })
  @IsNotEmpty({ message: "El nombre no puede estar vacío." })
  name: string;

  @IsNumber({}, { message: "El precio debe ser un número." })
  @IsNotEmpty({ message: "El precio no puede estar vacío." })
  price: number;

  @IsString({ message: "La imagen debe ser una cadena de caracteres." })
  @IsNotEmpty({ message: "La imagen no puede estar vacía." })
  image: string;

  @IsString({ message: "La imagen debe ser una cadena de caracteres." })
  description: string;

  @IsArray({ message: "No corresponde el tipo de datos" })
  categories: string[];

  @IsNumber({}, { message: "El conteo en stock debe ser un número." })
  @IsNotEmpty({ message: "El conteo en stock no puede estar vacío." })
  countInStock: number;
}
