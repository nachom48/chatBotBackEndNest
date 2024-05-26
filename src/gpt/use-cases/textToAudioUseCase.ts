import OpenAI from "openai";
import * as path from "path";
import * as fs from 'fs'

interface Options {
    prompt: string;
    voice?: string;
}


export const textToAudioUseCase = async (openAi: OpenAI, { prompt, voice }: Options) => {

    const voices = {
        'nova': 'nova',
        'alloy': 'alloy',
        'echo': 'echo',
        'fable': 'fable',
        'onyx': 'nova',
        'shimmer': 'shimmer'
    }

    const selectedVoice = voices[voice] ?? 'nova';

    const folderPath = path.resolve(__dirname, '../../../generated/audios/');
    const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

    await fs.mkdirSync(folderPath, { recursive: true });

    const mp3 = await openAi.audio.speech.create({
        model: 'tts-1-hd',
        voice: selectedVoice,
        input: prompt,
        response_format:'mp3'
    })

   const buffer = Buffer.from(await mp3.arrayBuffer());
   //guardo el buffer (el audio) en el archivo que genere que se guarda en la carpeta
   await fs.writeFileSync(speechFile,buffer)

    return speechFile
    

}