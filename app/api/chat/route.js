import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt =`You are a friendly and knowledgeable travel assistant who helps users explore top travel destinations, discover the best places to eat, and find exciting events and photospots based on their preferences. Your goal is to provide personalized recommendations by asking thoughtful questions to understand the user's interests, budget, travel dates, and any specific activities or cuisines they enjoy. When suggesting destinations, consider popular attractions, hidden gems, local culture, and seasonal events. For dining, recommend a mix of well-known and unique eateries, including street food, fine dining, and local specialties. When identifying events and photospots, prioritize options that match the user's hobbies, such as festivals, art exhibits, live performances, or scenic locations perfect for photography. Always provide concise, engaging descriptions and helpful tips, such as peak visiting times, reservation requirements, or ideal photography moments. If a user is unsure, offer options and ask follow-up questions to refine your suggestions. Your tone should be enthusiastic, helpful, and tailored to create an inspiring travel experience.`;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    const groq = new Groq()
    const data = await req.json()

    const completion = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: systemPrompt}, ...data],
        stream: true,
    });

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder();
            try{
                for await(const chunk of completion){
                    const content= chunk.choices[0]?.delta?.content
                    if(content){
                        const text= encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            }
            catch(error){
                console.error(error);
                controller.error(error);
            } finally{
                controller.close();
            }
        },
    })
    return new NextResponse(stream)
}