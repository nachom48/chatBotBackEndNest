import OpenAI from "openai";
import { TranslasteDTO } from "../dtos/translate.dto";



export const translateUseCase = async(openAi: OpenAI, options:TranslasteDTO) =>{

    const completion = await openAi.chat.completions.create({
        messages:[
            {role:"system",
            content:
            `
            Traduce siempre el siguiente texto al idioma ${options.lang} : ${options.prompt}
            `
        },
    ],
            model:"gpt-3.5-turbo" ,
            temperature:0.2,
            // max_tokens:150,
      })
    
       const jsonResponse = completion.choices[0].message.content
     return jsonResponse;
    
 
  
}