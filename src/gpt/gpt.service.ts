import { Injectable, NotFoundException } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos/orthography.dto';
import OpenAI from 'openai';
import { ProConsDto } from './dtos/proCons.dto';
import { proConsUseCase } from './use-cases/proConsUseCase';
import { proConsStreamUseCase } from './use-cases/proConsStreamUseCase';
import { TranslasteDTO } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translateUseCase';
import { TextToAudioDTO } from './dtos/textToAudio.dto';
import { textToAudioUseCase } from './use-cases/textToAudioUseCase';
import * as path from 'path';
import * as fs from 'fs'

@Injectable()
export class GptService {
    private openAi = new OpenAI({
        apiKey:process.env.OPENAI_API_KEY
    })
    //Solo va a llamar casos de uso
    async ortographyCheck(orthographyDto:OrthographyDto){
        return await orthographyCheckUseCase(this.openAi,{
            prompt:orthographyDto.prompt
        });
    }
    async proConsDiscusser(proConsDto:ProConsDto){
        return await proConsUseCase(this.openAi,{
            prompt:proConsDto.prompt
        })
    }

    async proConsDiscusserStream(proConsDto:ProConsDto){
        return await proConsStreamUseCase(this.openAi,{
            prompt:proConsDto.prompt
        })
    }

    async textToAudio({prompt,voice}:TextToAudioDTO){
        return await textToAudioUseCase(this.openAi,{prompt,voice})
    }

    async translate(translateDto:TranslasteDTO){
        return await translateUseCase(this.openAi,translateDto)
    }

    async textToAudioGetter(fileId:string){
        const filePath = path.resolve(__dirname,'../../generated/audios/',`${fileId}.mp3`)
        
        const wasFound = fs.existsSync(filePath)   ;

        if(!wasFound) new NotFoundException(`File ${fileId} not found`);   
        
        return filePath;
    }
}

