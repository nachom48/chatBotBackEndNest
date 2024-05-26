import OpenAI from "openai";

interface Options {
    threadId:string;
    question:string;
}
//siempre necesitamos un thread, el mensaje siempre va en un thread
export const createMessageUseCase = async ( openAi: OpenAI ,options:Options) => {

    const {threadId,question} = options;


    //va en user porque esta es la pregunta que hace el usuario
    //esto crea el mensaje, no lo ejecuta,solo lo crea en el thread
    const message = await openAi.beta.threads.messages.create(threadId,{
        role:'user',
        content:question,
        
    });

    return message;

}