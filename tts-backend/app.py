from flask import Flask, request, jsonify
from gtts import gTTS
import os
import asyncio
from googletrans import Translator

app = Flask(__name__)

async def translate_text(mytext, language):
    translator = Translator()
    translated_text = await translator.translate(mytext, dest=language)
    return translated_text.text

@app.route("/text-to-speech", methods=["POST"])
def text_to_speech():
    # Get the text and language from the React app
    data = request.json
    text = data.get("text")
    language = data.get("language", "en")  # Default to English if no language is provided

    if not text:
        return jsonify({"error": "Text is required"}), 400

    try:
        # Translate the text
        translated_text = asyncio.run(translate_text(text, language))

        # Convert translated text to speech
        tts = gTTS(translated_text, lang=language, slow=False)
        audio_file = "output.mp3"
        tts.save(audio_file)  # Save the audio file

        # Return the audio file URL and translated text
        return jsonify({
            "audio_url": f"http://localhost:5000/{audio_file}",
            "translated_text": translated_text
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/output.mp3")
def serve_audio():
    # Serve the audio file
    return app.send_static_file("output.mp3")

if __name__ == "__main__":
    app.run(port=5000)