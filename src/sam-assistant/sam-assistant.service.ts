import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { checkRunCompleteStatusUseCase, createMessageUseCase, createRunUseCase, createThreadUseCase, getMessageListUseCase } from './use-cases';
import { QuestionDTO } from './dtos/question.dto';
import { threadId } from 'worker_threads';

@Injectable()
export class SamAssistantService {

    private openAi = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })


    async createThread() {
        return await createThreadUseCase(this.openAi)
    }

    async userQUestion(questionDto: QuestionDTO) {
        const {threadId,question} = questionDto;

        //Se crea el mensaje, se crea el run, y se verifica el estado del Run 
        const message = await createMessageUseCase(this.openAi, questionDto);

        const run = await createRunUseCase(this.openAi, { threadId });
        await checkRunCompleteStatusUseCase(this.openAi,{runId:run.id,threadId});

        const messages = await getMessageListUseCase(this.openAi,{threadId})
        return messages.reverse();
    }

}



