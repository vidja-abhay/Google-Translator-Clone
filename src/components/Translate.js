import React, { useEffect } from 'react'
import countries from '../data'
import axios from 'axios';

const Translate = () => {

    useEffect(() => {
        const fromText = document.querySelector(".from-text")
        const toText = document.querySelector(".to-text")
        const exchangeIcon = document.querySelector(".exchange")
        const selectTag = document.querySelectorAll("select")
        const icons = document.querySelectorAll('.row i')
        const translateBtn = document.querySelector('button')

        selectTag.forEach((tag, id) => {
            for (let country_code in countries) {
                let selected = id === 0 ? country_code === "en-GB" ? "selected" : "" : country_code === "hi-IN" ? "selected" : "";

                let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`

                tag.insertAdjacentHTML("beforeend", option)
            }
        })

        exchangeIcon.addEventListener('click', () => {
            let tempText = fromText.value;
            let tempLang = selectTag[0].value;
            fromText.value = toText.value;
            toText.value = tempText;

            selectTag[0].value = selectTag[1].value;
            selectTag[1].value = tempLang;
        })

        fromText.addEventListener('keyup', () => {
            if (!fromText.value) {
                toText.value = ""
            }
        })

        translateBtn.addEventListener('click', async () => {
            let text = fromText.value.trim()
            let translateFrom = selectTag[0].value;
            let translateTo = selectTag[1].value;

            if (!text) return;
            toText.setAttribute("placeholder", "Translating...")

            // const options = {
            //     method: 'POST',
            //     url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
            //     headers: {
            //         'content-type': 'application/json',
            //         'X-RapidAPI-Key': '65603eeb84mshc73cf34e597289bp1d2379jsna5f1c2d705f1',
            //         'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
            //     },
            //     data: {
            //         from: translateFrom,
            //         to: translateTo,
            //         q: text
            //     }
            // };

            // try {
            //     const response = await axios.request(options);
            //     // console.log(response.data);
            //     toText.value = response.data
            //     toText.setAttribute("placeholder", "Translation");
            // } catch (error) {
            //     console.error(error);
            // }

            const options = {
                method: 'POST',
                url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'cc44bd0376msha6dd1a04b94f530p17364fjsn4c1a8276626c',
                    'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
                },
                data: {
                    from: translateFrom,
                    to: translateTo,
                    q: text
                }
            };

            try {
                const response = await axios.request(options);
                toText.value = response.data
                toText.setAttribute("placeholder", "Translation");
            } catch (error) {
                console.error(error);
            }
        })

        icons.forEach((icon) => {
            icon.addEventListener("click", ({ target }) => {
                if (!fromText.value || !toText.value) return
                if (target.classList.contains("fa-copy")) {
                    if (target.id === "from") {
                        navigator.clipboard.writeText(fromText.value)
                    }
                    else {
                        navigator.clipboard.writeText(toText.value)
                    }
                } else {
                    let utterance;
                    if (target.id === 'from') {
                        utterance = new SpeechSynthesisUtterance(fromText.value)
                        utterance.lang = selectTag[0].value
                    }
                    else {
                        utterance = new SpeechSynthesisUtterance(toText.value)
                        utterance.lang = selectTag[1].value
                    }

                    speechSynthesis.speak(utterance)
                }

            })
        })
    }, [])

    return (
        <>
            <div className='container'>
                <div className='wrapper'>
                    <div className='text-input'>
                        <textarea spellCheck="false" className='from-text' placeholder='Enter text'></textarea>

                        <textarea readOnly spellCheck="false" className='to-text' placeholder='Translation'></textarea>
                    </div>

                    <ul className='controls'>
                        <li className='row from'>
                            <div className='icons'>
                                <i id='from' className='fas fa-volume-up'></i>
                                <i id='from' className='fas fa-copy'></i>
                            </div>

                            <select></select>
                        </li>

                        <li className='exchange'>
                            <i className='fas fa-exchange-alt' />
                        </li>

                        <li className='row to'>
                            <select></select>
                            <div className='icons'>
                                <i id='to' className='fas fa-volume-up'></i>
                                <i id='to' className='fas fa-copy'></i>
                            </div>
                        </li>
                    </ul>
                </div>

                <button>Translate Text</button>
            </div>
        </>
    )
}

export default Translate
