import { IsString } from 'class-validator';

/* ApiModelProperty decorator added for live documentation */
import { ApiModelProperty } from '@nestjs/swagger';

export class IdeaDTO {
  @ApiModelProperty()
  @IsString()
  idea: string;

  @ApiModelProperty()
  @IsString()
  description: string;
}
