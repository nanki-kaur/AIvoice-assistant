import asyncio,os
from googletrans import Translator  # Ensure this is an async-supported version
from gtts import gTTS
from googletrans import Translator
from IPython.display import Audio, display

async def translate_text(mytext, language):
    translator = Translator()
    translated_text = await translator.translate(mytext, dest=language)
    return translated_text.text

# Taking user input
mytext = input("Enter text to translate: ")
language = input("Enter target language (e.g., 'fr' for French, 'es' for Spanish): ")

# Running the async function properly
translated_text = asyncio.run(translate_text(mytext, language))
print("Translated text:", translated_text)
myobj = gTTS(text=translated_text, lang=language, slow=False)

# Save the output as an MP3 file
filename = "output.mp3"
myobj.save(filename)

# Play the generated speech
display(Audio(filename, autoplay=True))  
os.system("start output.mp3")
