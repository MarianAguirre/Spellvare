import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { environment } from '../environments/environments';


@Injectable({
  providedIn: 'root',
})
export class IaService {
  constructor(private http: HttpClient) {}
  private apiUrl ='https://router.huggingface.co/v1/chat/completions';
  private apiKey = environment.token;


async query(text: string, traduccion: string): Promise<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.apiKey}`,
    'Content-Type': 'application/json',
  });

  const payload = {
    model: "meta-llama/Llama-3.3-70B-Instruct:groq",
    messages: [
      {
        role: "system",
        content: "Eres un profesor experto en el sistema Braille y en didáctica de la enseñanza inclusiva. Tu tarea es evaluar traducciones de texto a Braille y ofrecer recomendaciones prácticas y educativas. Tu estilo debe ser claro, respetuoso, profesional y conciso. Responde siempre en español",
      },
      {
        role: "user",
        content: `Texto original: "${text}"
Traducción a Braille: "${traduccion}"

Proporciona **exactamente tres recomendaciones, datos curiosos, verificaciones o alternativas de traducción de abreviaturas y contracciones en Braille** si existen.
Incluye también el tipo de Braille que se utilizó.

El resultado debe presentarse **como una lista numerada del 1 al 3**, con frases claras y breves, **sin introducciones ni comentarios adicionales**.
`,
      },
    ],
    max_tokens: 300,
    temperature: 0.7,
  };

  try {
    console.log(payload.messages)
    const response = await this.http
      .post(this.apiUrl, payload, { headers })
      .toPromise();

    console.log("Respuesta IA:", response);
    return response;
  } catch (error) {
    console.error("Error en la llamada a Hugging Face:", error);
    throw error;
  }
}
}

