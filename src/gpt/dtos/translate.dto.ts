import { IsInt, IsNotEmpty,  IsString } from "class-validator";


export class TranslasteDTO{

    @IsString()
    @IsNotEmpty()
    readonly prompt:string;


    @IsString()
    @IsNotEmpty()
    readonly lang:string;

}