import React, { useState } from 'react';
import Styles from './socio.module.css';
import { Audio } from 'react-loader-spinner'
import Captions from './Captions';

function SocioHome() {
    const [title, setTitle] = useState('');
    const [loader,setLoader] = useState(false);
    const [captions,setCaptions] = useState(false);
    const [desc,setdesc] = useState('')

    const _fetchdesc = async () => {
        setLoader(true)
        const {
            GoogleGenerativeAI,
            HarmCategory,
            HarmBlockThreshold,
        } = require("@google/generative-ai");

        const MODEL_NAME = "gemini-1.0-pro";
        const API_KEY = "AIzaSyB-gYeps1h7YUPOSCNIDtB0Z4zBGDLzhoA";

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
                    parts: [{ text: "Create the description with 30 words for the title AI" }],
                },
                {
                    role: "model",
                    parts: [{ text: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. AI has the potential to automate tasks, improve decision-making, and enhance human capabilities." }],
                },
            ],
        });

        const result = await chat.sendMessage(title);
        const response = result.response;
        const out = response.text();
        displaySentence(out);
        setdesc(response.text())
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const generatePrompts = () => {
        _fetchdesc();
    };

    function displaySentence(res) {
        document.querySelector(`.${Styles.result}`).innerHTML = "";
        setLoader(false)
        let index = 0;
        function displayNextCharacter() {
            if (index < res.length) {
                document.querySelector(`.${Styles.result}`).innerHTML += res[index];
                index++;
                setTimeout(displayNextCharacter, 1);
            } else {
                res = '';
                setCaptions(true)
            }
        }
        displayNextCharacter();
    }

    return (
        <div>
            <header className={Styles.header}>Social Media Content Generator</header>
            <div className={Styles.container}>
                <div className={Styles.inpdiv}>
                    <div className={Styles.inp}>
                        <input
                            type="text"
                            placeholder="Post title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <button onClick={generatePrompts} className={Styles.button} disabled={!title}>
                        Generate Description
                    </button>
                </div>
                {
                    setLoader ? <Audio height="80" width="80" radius="9" color="black" ariaLabel="three-dots-loading" wrapperStyle wrapperClass visible={loader}/>
                    : null
                }
                <div className={Styles.result}></div>
                {
                    captions ? <Captions title={title} desc={desc}/> : null
                }
            </div>
        </div>
    );
}

export default SocioHome;
