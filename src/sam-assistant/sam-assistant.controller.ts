import { Body, Controller, Post } from '@nestjs/common';
import { SamAssistantService } from './sam-assistant.service';
import { QuestionDTO } from './dtos/question.dto';

@Controller('sam-assistant')
export class SamAssistantController {
  constructor(private readonly samAssistantService: SamAssistantService) {}



  @Post('create-thread')
  async createthread(){
    return this.samAssistantService.createThread();
  }
  
  @Post('user-question')
  async userQuestion(
    @Body() questionDto: QuestionDTO
  ){
    return await this.samAssistantService.userQUestion(questionDto);
  }
}
