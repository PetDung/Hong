// Pixel Heart Animation
(function() {
  const canvas = document.getElementById('heartCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let time = 0;

  // Set canvas size
  function resizeCanvas() {
    canvas.width = 60;
    canvas.height = 60;
  }
  resizeCanvas();

  // Smooth heart pattern using a mathematical approach
  function isInsideHeart(x, y, size = 6) {
    // Normalize coordinates to -1 to 1
    const nx = (x - size / 2) / size;
    const ny = (y - size / 2) / size;
    
    // Heart equation using parametric form
    const t = Math.atan2(ny, nx);
    const r = Math.sqrt(nx * nx + ny * ny);
    
    // Heart shape function (smoother version)
    const heartR = (
      (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16
    );
    
    return r < Math.abs(heartR) * 1.1; // Slightly expanded for smoother appearance
  }

  // Animation loop
  function animate() {
    time += 0.016; // ~60fps

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate beat scale
    const beatPhase = (Math.sin(time * 3) + 1) / 2; // 0 to 1, cycles at 3 rad/s
    const scale = 1 + beatPhase * 0.15; // Scale from 1 to 1.15

    // Calculate center
    const centerX = 30;
    const centerY = 30;
    const pixelSize = (60 / 6) * scale; // 10px base, scales with beat

    // Draw smooth pixel heart with higher resolution
    const gridSize = 6;
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (isInsideHeart(x, y, gridSize)) {
          // Calculate position from center with scaling
          const offsetX = (x - gridSize / 2) * pixelSize;
          const offsetY = (y - gridSize / 2) * pixelSize;
          const pixelX = centerX + offsetX;
          const pixelY = centerY + offsetY;

          // Draw rounded pixel with smooth gradient
          const gradient = ctx.createRadialGradient(
            pixelX + pixelSize / 2,
            pixelY + pixelSize / 2,
            0,
            pixelX + pixelSize / 2,
            pixelY + pixelSize / 2,
            pixelSize * 0.7
          );
          gradient.addColorStop(0, 'rgba(255, 20, 100, 1)');
          gradient.addColorStop(0.6, 'rgba(255, 0, 85, 0.95)');
          gradient.addColorStop(1, 'rgba(220, 0, 70, 0.7)');
          
          ctx.fillStyle = gradient;
          // Draw rounded rectangles for smoother appearance
          roundRect(ctx, pixelX, pixelY, pixelSize, pixelSize, pixelSize * 0.3);
          ctx.fill();

          // Subtle border
          ctx.strokeStyle = 'rgba(255, 100, 150, 0.3)';
          ctx.lineWidth = 0.3;
          roundRect(ctx, pixelX, pixelY, pixelSize, pixelSize, pixelSize * 0.3);
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  // Helper function to draw rounded rectangles
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // Start animation
  animate();

  // Clean up when page unloads
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
})();
