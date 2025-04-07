import { IsNotEmpty, Length, IsNumber, IsBoolean } from 'class-validator';

export class CreateCourtDto {
  @IsNotEmpty()
  @Length(1, 20)
  name: string;

  @IsNotEmpty()
  @Length(1, 200)
  location: string;

  @IsNotEmpty()
  @IsNumber()
  surfaceCount: number;

  @IsNotEmpty()
  @IsNumber()
  isOutdoor: number;
}
