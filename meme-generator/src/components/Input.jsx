import { useState, useEffect } from "react";
import axios from "axios";
import "./Input.css";

export default function Input() {
    const [allMemes, setAllMemes] = useState([]);
    const [memeInfo, setMemeInfo] = useState({
        topText: "One does not simply",
        bottomText: "Walk into mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    });

    useEffect(() => {
        axios
            .get("https://api.imgflip.com/get_memes")
            .then((res) => {
                console.log(res.data.data.memes);
                setAllMemes(res.data.data.memes);
            })
            .catch((error) => {
                console.error("Error fetching memes:", error);
            });
    }, []);

    const handleChange = (event) => {
        const { value, name } = event.currentTarget;
        setMemeInfo((memeInfo) => ({
            ...memeInfo,
            [name]: value
        }));
    };

    const getMemeImage = () => {
        const randomIndex = Math.floor(Math.random() * allMemes.length);
        const newMemeUrl = allMemes[randomIndex]?.url;
        if (newMemeUrl) {
            setMemeInfo((memeInfo) => ({
                ...memeInfo,
                imageUrl: newMemeUrl
            }));
        } else {
            console.error("No meme URL available.");
        }
    };

    return (
        <>
            <main>
                <div className="form">
                    <label>
                        Top Text
                        <input
                            type="text"
                            placeholder="One does not simply"
                            name="topText"
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Bottom Text
                        <input
                            type="text"
                            placeholder="Walk into mordor"
                            name="bottomText"
                            onChange={handleChange}
                        />
                    </label>
                    <button onClick={getMemeImage}>
                        Get a new meme image 🖼
                    </button>
                </div>
                <div className="meme">
                    <img src={memeInfo.imageUrl} alt="Meme" />
                    <span className="top">{memeInfo.topText}</span>
                    <span className="bottom">{memeInfo.bottomText}</span>
                </div>
            </main>
        </>
    );
}
