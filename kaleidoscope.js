document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('kaleidoscopeCanvas');
    const ctx = canvas.getContext('2d');
    const imageLoader = document.getElementById('imageLoader');
    const symmetryInput = document.getElementById('symmetry');
    const rotationInput = document.getElementById('rotation');
    let image = new Image();
    let symmetry = parseInt(symmetryInput.value);
    let rotation = parseInt(rotationInput.value);

    window.loadImage = function() {
        const file = imageLoader.files[0]; // Get the file from the input
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                image.onload = function() {
                    drawKaleidoscope(); // Redraw the kaleidoscope with the new image
                };
                image.src = event.target.result; // Set the image source to the file content
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    // Adjust symmetry
    symmetryInput.addEventListener('input', function() {
        symmetry = parseInt(this.value);
        drawKaleidoscope();
    });

    // Adjust rotation
    rotationInput.addEventListener('input', function() {
        rotation = parseInt(this.value);
        drawKaleidoscope();
    });

    function drawKaleidoscope() {
        if (!image.src) return; // Ensure there's an image loaded

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotation * Math.PI / 180); // Convert rotation to radians

        for (let i = 0; i < symmetry; i++) {
            ctx.rotate(2 * Math.PI / symmetry); // Divide the circle by the number of symmetries
            ctx.drawImage(image, -canvas.width / 4, -canvas.height / 4, canvas.width / 2, canvas.height / 2);
            ctx.scale(1, -1); // Reflect the image for kaleidoscope effect
            ctx.drawImage(image, -canvas.width / 4, -canvas.height / 4, canvas.width / 2, canvas.height / 2);
            ctx.scale(1, -1); // Reset the scale for the next iteration
        }
        ctx.restore();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    window.clearCanvas = clearCanvas;
});
