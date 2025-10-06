'use server';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {next} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [next(), googleAI()],
  model: 'gemini-2.5-flash',
});
