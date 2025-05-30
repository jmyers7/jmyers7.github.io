function copyCode(button) {
  const code = document.getElementById("code-snippet").innerText;

  // Display the initial button
  const displayCopy = () => {
    button.innerHTML =
      '<img src="/assets/images/copy.svg" style="vertical-align: middle; width: 15px; height: 15px;">  copy code';
  };

  // Display the "Copied!" button (and check mark image) on click, then cycle back to the default button after 2 sec
  const displayCopied = () => {
    button.innerHTML =
      '<img src="/assets/images/check.svg" style="vertical-align: middle; width: 15px; height: 15px;">  copied!';
    setTimeout(displayCopy, 2000);
  };

  // Copy to the clipboard!
  navigator.clipboard.writeText(code).then(displayCopied);
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
  const defns = document.querySelectorAll(".highlight-box");
  defns.forEach((defn, idx) => {
    let title = defn.id.split("-").pop();
    if (title === "defn") {
      title = "Definition";
    } else if (title === "thm") {
      title = "Theorem";
    }
    defn.insertAdjacentHTML(
      "afterbegin",
      '<div style="font-weight: bold; margin-top: 10px; font-size: 1.2em;">' +
        `${title} ${pageNum}.${idx + 1}.</div>`
    );
  });
}

function refDefn(pageNum, defnId) {
  const spanId = defnId + "-ref";
  const defns = document.querySelectorAll(".highlight-box");
  let defnNumber;
  for (let i = 0; i < defns.length; i++) {
    if (defns[i].id === defnId) {
      defnNumber = i + 1;
      break;
    }
  }

  let title = defnId.split("-").pop();
    if (title === "defn") {
      title = "Definition";
    } else if (title === "thm") {
      title = "Theorem";
    }

  document.getElementById(
    spanId
  ).innerHTML = `<a href="#${defnId}">${title} ${pageNum}.${defnNumber}</a>`;
}

function adjustContentPadding(headerId, contentId, offset = 0) {
  const headerHeight = document.getElementById(headerId).offsetHeight;
  const postContent = document.getElementById(contentId);
  postContent.style.marginTop = headerHeight + offset + "px";
}

function setScrollMargin(headerId, currentSectionId) {
  const headerHeight = document.getElementById(headerId).offsetHeight;
  const currentSectionHeight =
    document.getElementById(currentSectionId).offsetHeight;
  const subHeaderHeight = headerHeight - currentSectionHeight;

  const nonSectionTargetElements = document.querySelectorAll("[id]:not(h2)");
  const sectionTargetElements = document.querySelectorAll("h2");

  nonSectionTargetElements.forEach((element) => {
    element.style.scrollMarginTop = headerHeight + 5 + "px";
  });

  sectionTargetElements.forEach((element) => {
    element.style.scrollMarginTop = subHeaderHeight + "px";
  });
}

// Function to check which section is currently in view
function updateCurrentSectionOnScroll(pageNum, currentSectionId, headerId) {
  const currentSectionDisplay = document.getElementById(currentSectionId);
  const headerHeight = document.getElementById(headerId).offsetHeight;
  let currentSection = null;

  // Loop through each section to check if it's partially in view
  document.querySelectorAll("section").forEach((section) => {
    const rect = section.getBoundingClientRect();

    // Check if the section is partially in view
    if (rect.top < headerHeight && rect.bottom > 0) {
      currentSection = section.getAttribute("data-sec-title");
    }
  });

  // Update the display with the current section title
  currentSectionDisplay.textContent = currentSection
    ? `${currentSection}`
    : `${pageNum}.0. introduction`;
}

function hoverImage(imgId, blackImgSrc, accentImgSrc, altTargetId = null) {
  const image = document.getElementById(imgId);
  image.addEventListener("mouseover", () => (image.src = accentImgSrc));
  image.addEventListener("mouseout", () => (image.src = blackImgSrc));

 if (altTargetId !== null) {
  const altElement = document.getElementById(altTargetId);
  altElement.addEventListener("mouseover", () => (image.src = accentImgSrc));
  altElement.addEventListener("mouseout", () => (image.src = blackImgSrc));
 } 
}
