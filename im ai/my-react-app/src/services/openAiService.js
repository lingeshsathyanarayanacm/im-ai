// src/services/openAiService.js
const generateImage = async (prompt) => {
    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
        },
        body: JSON.stringify({
          prompt,
          max_tokens: 100,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.choices[0].text.trim(); // Assuming the API returns an object with 'choices' property
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  };
  
  export default generateImage;
  