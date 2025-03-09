const apiKey = "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"; // ⚠️ Keep this safe! Use a backend for security.

async function chatBot() {
    let input = document.getElementById("chat-input").value.trim();
    let output = document.getElementById("chat-output");
    
    if (!input) return;

    output.innerHTML += `<p><strong>User:</strong> ${input}</p>`;
    document.getElementById("chat-input").value = "";

    const response = await getAIResponse(input);
    
    output.innerHTML += `<p><strong>Mr. Coffee:</strong> ${response}</p>`;
    output.scrollTop = output.scrollHeight;
}

async function getAIResponse(userInput) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
}
