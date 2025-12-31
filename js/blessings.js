// Blessings Display Handler
(function() {
  const blessingText = `Trong thời đại mà thời gian phát triển là yếu tố sống còn, công cụ hỗ trợ viết mã bằng AI đang định hình lại cách chúng ta xây dựng phần mềm. Những công cụ này tăng tốc độ viết mã, giảm lỗi và thậm chí còn gợi ý các giải pháp sáng tạo cho những vấn đề phức tạp.`;
  
  const blessingWords = blessingText.split(' ');
  let wordIndex = 0;
  let isInitialized = false;
  let blessingStack = 0;

  console.log('Blessings system loaded'); // Debug

  // Initialize when splash screen is hidden
  window.addEventListener('blessingSystemReady', function() {
    console.log('Blessings system initialized'); // Debug
    isInitialized = true;
    wordIndex = 0;
    blessingStack = 0;
    
    // Start auto-displaying blessing text
    displayNextBlessing();
  });

  // Display next blessing text automatically
  function displayNextBlessing() {
    if (!isInitialized) return;

    const container = document.getElementById('blessingsContainer');
    if (!container) {
      console.log('Container not found'); // Debug
      return;
    }

    // Get next portion of text (4-7 words at a time)
    const wordsPerShot = 4 + Math.floor(Math.random() * 4); // 4-7 words
    const textToShow = blessingWords
      .slice(wordIndex, wordIndex + wordsPerShot)
      .join(' ');

    wordIndex += wordsPerShot;

    // Stop if reached end
    if (wordIndex >= blessingWords.length) {
      console.log('Full letter displayed'); // Debug
      return;
    }

    if (!textToShow) return;

    console.log('Displaying blessing:', textToShow); // Debug

    // Calculate Y position to avoid overlapping
    const topPosition = 100 + (blessingStack * 80); // Stack vertically with 80px spacing
    blessingStack++;
    
    // Reset stack after 6 items (one page full)
    if (blessingStack >= 6) {
      blessingStack = 0;
    }

    // Create blessing element
    const blessing = document.createElement('div');
    blessing.className = 'blessing';
    blessing.style.setProperty('--bless-top', topPosition + 'px');
    blessing.textContent = ''; // Start empty
    container.appendChild(blessing);

    // Display text character by character (handwriting effect)
    let charIndex = 0;
    const charDelay = 80; // 80ms between each character for natural speed
    
    function displayChar() {
      if (charIndex < textToShow.length) {
        blessing.textContent += textToShow[charIndex];
        charIndex++;
        setTimeout(displayChar, charDelay);
      } else {
        // When finished typing, continue with next blessing after minimal delay
        const totalTypingTime = textToShow.length * charDelay;
        setTimeout(displayNextBlessing, totalTypingTime + 300); // Only 300ms delay after finishing
      }
    }
    
    displayChar();
  }
})();

