import React, { useState } from 'react'

function Test() {

const [res, setRes] = useState([])

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "AIzaSyB-gYeps1h7YUPOSCNIDtB0Z4zBGDLzhoA";
  
  async function runChat() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "I give the prompt based on that prompt description of 5 para and each with to be generate and i need a response as a  title and desc with the new line"}],
        },
        {
          role: "model",
          parts: [{ text: "**Title:** A Journey of Discovery and Fulfillment: Exploring the Meaning of Life\n\n**Description:**\nEmbark on an introspective quest to unlock the secrets of human existence. Delve into the depths of philosophy, spirituality, and personal experiences to unravel the intricate tapestry of life. Discover the profound purpose and meaning that lies within each of us, guiding us towards a path of fulfillment and contentment. Explore the complexities of our emotions, relationships, and aspirations, and gain a deeper understanding of the human condition. Uncover the transformative power of self-reflection, fostering a profound connection with your inner self and the universe around you."}],
        },
      ],
    });
  
    const result = await chat.sendMessage("YOUR_USER_INPUT");
    const response = result.response;
    console.log(response.text());
  }
  
  runChat();


  return (
    <div>
        <h1>Testing</h1>
    </div>
  )
}

export default Test
