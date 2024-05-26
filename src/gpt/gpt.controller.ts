import { Body, Controller, Get, HttpStatus, Param, Post, Res, Scope } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos/orthography.dto';
import { Response } from 'express';
import { TranslasteDTO } from './dtos/translate.dto';
import { TextToAudioDTO } from './dtos/textToAudio.dto';

@Controller({
    path: 'gpt',
    scope: Scope.REQUEST,
})
export class GptController {

  
  constructor(
    //Inyección de dependencias
    private readonly gptService: GptService
    ) {}


  @Post('orthography')
  orthographyCheck(
    @Body() orthographyDto:OrthographyDto
  ){
    return this.gptService.ortographyCheck(orthographyDto);
  }

  @Post('translate')
  translate(
    @Body() translateDTO:TranslasteDTO
  ){
    return this.gptService.translate(translateDTO);
  }

  @Post('proscons')
  proCons(
    @Body() orthographyDto:OrthographyDto
  ){
    return this.gptService.proConsDiscusser(orthographyDto);
  }

  @Post('prosconsStream')
  async proConsStream(
    @Body() orthographyDto:OrthographyDto,
    @Res() res : Response
  ){
    //como tengo el decorador Res tengo que emitir la respuesta esperada, no sirve el return 
    const stream =  await this.gptService.proConsDiscusserStream(orthographyDto);
    res.setHeader('Content-Type','application/json');
    res.status(HttpStatus.OK);
    //son varias emisiones de nuestra respuesta
    for await ( const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }
    res.end();
  }

  @Post('text-to-audio')
  async textToAudio(
    @Body() textToAudioDto:TextToAudioDTO,
    @Res() res : Response
  ){
    const filePath = await this.gptService.textToAudio(textToAudioDto);
    res.setHeader('Content-Type','audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Get('text-to-audio/:fileId')
  async textToAudioGetter(
    @Res() res : Response,
    @Param() fileId:string
  ){
    const filePath = await this.gptService.textToAudioGetter(fileId);  
    res.setHeader('Content-Type','audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

}
