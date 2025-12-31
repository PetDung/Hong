// Splash Screen Handler
(function() {
  const splashScreen = document.getElementById('splashScreen');
  let fullscreenRequested = false;

  // Function to hide splash screen
  function hideSplashScreen() {
    if (splashScreen) {
      splashScreen.classList.add('fade-out');
      setTimeout(() => {
        splashScreen.remove();
      }, 800);
    }
  }

  // Function to request fullscreen
  function requestFullscreen() {
    const doc = document.documentElement;
    
    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    } else if (doc.webkitRequestFullscreen) {
      doc.webkitRequestFullscreen();
    } else if (doc.mozRequestFullScreen) {
      doc.mozRequestFullScreen();
    } else if (doc.msRequestFullscreen) {
      doc.msRequestFullscreen();
    }
  }

  // Exit fullscreen after delay
  function exitFullscreen() {
    setTimeout(() => {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }, 1500); // Stay in fullscreen for 1.5 seconds
  }

  // Handle click on next button
  if (splashScreen) {
    const nextBtn = document.getElementById('splashNextBtn');
    const bgMusic = document.getElementById('bgMusic');
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!fullscreenRequested) {
          fullscreenRequested = true;
          
          // Play background music
          if (bgMusic) {
            bgMusic.volume = 0.8; // Tăng volume nhạc lên 80%
            bgMusic.play().catch(err => console.log('Music play failed:', err));
          }
          
          requestFullscreen();
          hideSplashScreen();
          // Enable sound when entering
          if (typeof toggleSound !== 'undefined') {
            toggleSound(true);
          }
          // Initialize blessing system
          setTimeout(() => {
            window.dispatchEvent(new Event('blessingSystemReady'));
          }, 500);
        }
      });
    }

    // Also allow spacebar
    document.addEventListener('keydown', function(e) {
      if (!fullscreenRequested && e.code === 'Space') {
        e.preventDefault();
        fullscreenRequested = true;
        
        // Play background music
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
          bgMusic.volume = 0.8;
          bgMusic.play().catch(err => console.log('Music play failed:', err));
        }
        
        requestFullscreen();
        hideSplashScreen();
        // Enable sound when entering
        if (typeof toggleSound !== 'undefined') {
          toggleSound(true);
        }
        // Initialize blessing system
        setTimeout(() => {
          window.dispatchEvent(new Event('blessingSystemReady'));
        }, 500);
      }
    });
  }
})();
