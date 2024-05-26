import OpenAI from "openai";

interface Options {
    threadId:string;
    runId:string;
}

export const checkRunCompleteStatusUseCase = async (openAi:OpenAI,options:Options) =>{
    const { threadId,runId} = options;

    const runStatus = await openAi.beta.threads.runs.retrieve(threadId,runId);

    console.log({status: runStatus.status}); //seguir la funcion hasta que sea completed


    if ( runStatus.status === 'completed') {
        return runStatus;
    }
    // else if( runStatus.status === 'fail'){

    // }

    //Esperar un segundo antes de volver a consultar

    await new Promise( resolve => setTimeout(resolve,1000));

    //Hago la funcion recursiva hasta que se resuelva el Run
    return await checkRunCompleteStatusUseCase(openAi,options);
    
}