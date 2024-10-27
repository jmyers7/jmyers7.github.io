function copyCode(button) {
    const code = document.getElementById("code-snippet").innerText;
    
    // Display the initial button
    const displayCopy = () => {
      button.innerHTML = '<img src="/assets/images/copy.svg" style="vertical-align: middle; width: 15px; height: 15px;">  copy code'
    }

    // Display the "Copied!" button (and check mark image) on click, then cycle back to the default button after 2 sec
    const displayCopied = () => {
      button.innerHTML = '<img src="/assets/images/check.svg" style="vertical-align: middle; width: 15px; height: 15px;">  copied!';
      setTimeout(displayCopy, 2000);
    }

    // Copy to the clipboard!
    navigator.clipboard.writeText(code).then(displayCopied)
  }

function createCodeBlock(containerId, codeText) {
  const container = document.getElementById(containerId);

  // Create the main div with class "code-container"
  const codeContainer = document.createElement("div");
  codeContainer.className = "code-container";

  // Create a header div to hold both the language name and the copy button
  const headerDiv = document.createElement("div");
  headerDiv.style.display = "flex";
  headerDiv.style.justifyContent = "space-between";
  headerDiv.style.alignItems = "center";

  // Create the language label
  const languageLabel = document.createElement("span");
  languageLabel.textContent = "python";
  languageLabel.style.fontFamily = "Geneva";
  languageLabel.style.color = "#808080";
  languageLabel.style.fontSize = "0.8em";
  headerDiv.appendChild(languageLabel);

  // Create the copy button
  const copyButton = document.createElement("button");
  copyButton.className = "copy-button";
  copyButton.onclick = function () {
    copyCode(copyButton);
  };

  const buttonImage = document.createElement("img");
  buttonImage.src = "/assets/images/copy.svg";
  buttonImage.style = "vertical-align: middle; width: 15px; height: 15px;";
  copyButton.appendChild(buttonImage);

  const buttonText = document.createTextNode(" copy code");
  copyButton.appendChild(buttonText);
  headerDiv.appendChild(copyButton);

  // Create the <pre> and <code> elements
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  code.className = "language-python";
  code.id = "code-snippet";
  code.textContent = codeText;

  // Assemble the elements
  pre.appendChild(code);
  codeContainer.appendChild(headerDiv);
  codeContainer.appendChild(pre);

  container.appendChild(codeContainer);
}

function makeDefns(pageNum) {
  const defns = document.querySelectorAll('.defn');
  defns.forEach(
        (defn, idx) => {
          defn.insertAdjacentHTML('afterbegin' ,`<div style="font-weight: bold; margin-top: 10px; font-size: 1.2em;">Definition ${pageNum}.${idx + 1}.</div>`);
        }
      );
}

function refDefn(pageNum, defnId) {
  const spanId = defnId + "-ref";
  const defns = document.querySelectorAll('.defn');
  let defnNumber;
  for (let i = 0; i < defns.length; i++) {
    if (defns[i].id === defnId) {
      defnNumber = i + 1;
      break;
    }
  }
  document.getElementById(spanId).innerHTML = `<a href="#${defnId}">Definition ${pageNum}.${defnNumber}</a>`;
}

function adjustContentPadding(headerId, contentId, offset = 0) {
  const headerHeight = document.getElementById(headerId).offsetHeight;
  const postContent = document.getElementById(contentId);
  postContent.style.marginTop = headerHeight + offset + 'px';
}