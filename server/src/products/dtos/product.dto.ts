import { IsString, IsNumber ,IsNotEmpty} from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

  @IsString()
  category: string;

  @IsNumber()
  countInStock: number;
}



export class CreateProductDto {
  @IsString({ message: 'El nombre debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  name: string;

  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @IsNotEmpty({ message: 'El precio no puede estar vacío.' })
  price: number;

  @IsString({ message: 'La imagen debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'La imagen no puede estar vacía.' })
  image: string;

  @IsString({ message: 'La categoría debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'La categoría no puede estar vacía.' })
  category: string;

  @IsNumber({}, { message: 'El conteo en stock debe ser un número.' })
  @IsNotEmpty({ message: 'El conteo en stock no puede estar vacío.' })
  countInStock: number;
}
