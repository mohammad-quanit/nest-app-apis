import { IsString, IsNotEmpty } from 'class-validator';

/* ApiModelProperty decorator added for live documentation */
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
