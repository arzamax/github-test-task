import { IsString } from 'class-validator';

export class GetRepositoryDto {
  @IsString()
  public readonly owner: string | undefined;

  @IsString()
  public readonly repository!: string;
}
