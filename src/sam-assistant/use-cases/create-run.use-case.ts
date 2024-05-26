import OpenAI from "openai";

interface Options {
    threadId:string;
    assistantId:string;
}

//Primero creo el thread,luego el mensaje con el thread,luego ejecuto el run del thread(el tema)
//
export const createRunUseCase = async ( openai: OpenAI,options) => {
    
    const {threadId,assistantId = process.env.ASSISTANT_ID} = options;

    const run = await openai.beta.threads.runs.create(threadId,{
        assistant_id:assistantId,
        //instructions sobreescribe las instrucciones que pusimos inciialmente cuando creamos el asistente
        //en la pagina de openAi, tambien podemos cambiar el modelo etc,aqui es como para crear en caliente l asistente

    })
    console.log(run);
    //Cuando se completa,quiere decir que tenemos una respuesta del asistente, tiene estados el run
    // queded, in progress,c ancelled , expired,completed,failed,cancelled
    return run;   
}