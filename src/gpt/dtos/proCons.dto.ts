import { IsString } from "class-validator";

export class ProConsDto {
    @IsString()
    readonly prompt:string;
}