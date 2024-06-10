import OpenAI from "openai";
import {openAI_key} from '../components/constants'

const openai = new OpenAI({
    apiKey: openAI_key,
    dangerouslyAllowBrowser: true
});

export default openai;
