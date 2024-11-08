// languages options for the dropdowns
const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" }
  ];
  
  // gets the dropdown from the html
  const fromLang = document.getElementById("fromLang");
  const toLang = document.getElementById("toLang");
  
  // shows the language dropdowns
  languages.forEach(lang => {
    fromLang.innerHTML += `<option value="${lang.code}">${lang.name}</option>`;
    toLang.innerHTML += `<option value="${lang.code}">${lang.name}</option>`;
  });
  
  // sets defaults language to english and spanish
  fromLang.value = "en"
  toLang.value = "es"
  
  // function to translate the text
  async function translateText() {
    const inputText = document.getElementById("inputText").value;
    const outputText = document.getElementById("outputText");
  
    if (!inputText) return (outputText.textContent = "Enter text to translate.");
  
    try {
      // does the api request with my google api key
      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyAIGPzEIJK-C0vS0ab1Di_sCvGFbwxGocE`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: inputText,
          source: fromLang.value,
          target: toLang.value,
          format: "text",
        })
      })
  
      // parses and displays the translated text
      const data = await response.json();
      outputText.textContent = data.data.translations[0].translatedText
    } catch (error) {
      console.error("Translation error:", error)
      outputText.textContent = "Error. Try again."
    }
  }
  
 
  document.getElementById("translateButton").addEventListener("click", translateText);
  