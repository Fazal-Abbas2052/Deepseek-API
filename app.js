let sendBtn = document.querySelector("#submit-btn");
async function sendMessage() {
  let input = document.querySelector("#typing-text").value;
  let prompt = document.querySelector("#typing-text");
  let container = document.querySelector(".chat-container");

  // Displaying User prompt

  let indiv = document.createElement("div");
  indiv.innerHTML = `<div class="chat input">
        <img src="./USER.png" class="image" alt="" />
        <p class="input-text">${input}</p>
      </div>`;

  container.appendChild(indiv);

  prompt.value = "";

  let outdiv = document.createElement("div");
  outdiv.innerHTML = `<div class="chat output">
        <img src="./deepseek.jpeg" class="image" alt="" />
        <div class="output-text">
          <div class="loading">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
        </div>`;
  container.appendChild(outdiv);

  const KEY = "enter-api-key-here";

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KEY}`,
          "HTTP-Referer": "https://www.sitename.com",
          "X-Title": "SiteName",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [{ role: "user", content: input }],
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    const markdownText =
      data.choices?.[0]?.message?.content || "No response received.";
    let html = marked.parse(markdownText);
    let output = outdiv.querySelector(".output-text");
    output.innerHTML = html;
    output.insertAdjacentHTML(
      "afterend",
      `<button class="copy" onclick="copyResponse(this)">
          <span
            data-text-end="Copied!"
            data-text-initial="Copy to clipboard"
            class="tooltip"
          ></span>
          <span>
            <svg
              xml:space="preserve"
              style="enable-background: new 0 0 512 512"
              viewBox="0 0 6.35 6.35"
              y="0"
              x="0"
              height="20"
              width="20"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              class="clipboard"
            >
              <g>
                <path
                  fill="currentColor"
                  d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                ></path>
              </g>
            </svg>
            <svg
              xml:space="preserve"
              style="enable-background: new 0 0 512 512"
              viewBox="0 0 24 24"
              y="0"
              x="0"
              height="18"
              width="18"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              class="checkmark"
            >
              <g>
                <path
                  data-original="#000000"
                  fill="currentColor"
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                ></path>
              </g>
            </svg>
          </span>
        </button>`
    );

    //       <span
    //         data-text-end="Copied!"
    //         data-text-initial="Copy to clipboard"
    //         class="tooltip"
    //       ></span>
    //       <span>
    //         <svg
    //           xml:space="preserve"
    //           style="enable-background: new 0 0 512 512"
    //           viewBox="0 0 6.35 6.35"
    //           y="0"
    //           x="0"
    //           height="20"
    //           width="20"
    //           xmlns:xlink="http://www.w3.org/1999/xlink"
    //           version="1.1"
    //           xmlns="http://www.w3.org/2000/svg"
    //           class="clipboard"
    //         >
    //           <g>
    //             <path
    //               fill="currentColor"
    //               d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
    //             ></path>
    //           </g>
    //         </svg>
    //         <svg
    //           xml:space="preserve"
    //           style="enable-background: new 0 0 512 512"
    //           viewBox="0 0 24 24"
    //           y="0"
    //           x="0"
    //           height="18"
    //           width="18"
    //           xmlns:xlink="http://www.w3.org/1999/xlink"
    //           version="1.1"
    //           xmlns="http://www.w3.org/2000/svg"
    //           class="checkmark"
    //         >
    //           <g>
    //             <path
    //               data-original="#000000"
    //               fill="currentColor"
    //               d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
    //             ></path>
    //           </g>
    //         </svg>
    //       </span>
    //     </button>`;
  } catch (error) {
    output.innerHTML = "Error: " + error.message;
  }
}

sendBtn.addEventListener("click", sendMessage);
const copyResponse = (copyBtn) => {
  let text = copyBtn.parentElement.querySelector(".output-text");
  navigator.clipboard.writeText(text.textContent);
};
