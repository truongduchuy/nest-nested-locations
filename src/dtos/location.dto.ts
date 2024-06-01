import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  buildingId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  locationNumber: string;

  @IsOptional()
  parentId?: number;

  @IsNumber()
  @IsNotEmpty()
  area: number;
}

export class UpdateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  name: string;

  @IsOptional()
  locationNumber: string;

  @IsOptional()
  parentId: number;

  @IsOptional()
  area: number;
}
