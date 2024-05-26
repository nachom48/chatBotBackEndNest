import OpenAI from "openai"


interface Options {
    threadId:string;
}

export const getMessageListUseCase = async (openAi:OpenAI,options:Options) =>{
    const {threadId} = options;

    const messageList = await openAi.beta.threads.messages.list(threadId);

    console.log(messageList);

    //Despues del map cuando hago parentesis dsp de funcion flecha puedo devolver un 
    //objeto implicito
    const messages = messageList.data.map( message => ({
       role : message.role,// puede ser el asistente o el usuario el rol
       content: message.content.map( content => (content  as any).text.value)
    }))

    return messages;

}