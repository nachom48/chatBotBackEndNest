import OpenAI from "openai";

interface Options {
    prompt:string;
}




export const orthographyCheckUseCase = async(openAi: OpenAI, options:Options) =>{

    const {prompt} = options;
    const completion = await openAi.chat.completions.create({
        messages:[
            {role:"system",
            content:
            `
             Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
             las palabras usadas deben de existir en el diccionario de la real academia española,
            Debes de responder en Formato Json, 
            tu tarea es corregirlos y retornar informacion solicitudes,
            tambien debes de dar un porcentaje de acierto por el usuario, 


            Si no hay errores, debes retornar un mensaje de felicitaciones.

            Ejemplo de salida : 
            {
                userScore: number,
                errors: string[], // ['error -> solución']
                message: string, // Usa emojis y texto para felicitar al usuario.
            }
            `
        },
            {
                role:'user',
                content:prompt
            }],
            model:"gpt-3.5-turbo" ,
            temperature:0.3,
            max_tokens:150,
            response_format:{
                type:'json_object'
            }
      })
    
       const jsonResponse = JSON.parse(completion.choices[0].message.content)
     return jsonResponse;
    
 
  
}