const banner = document.getElementById("banner");

window.addEventListener('mousemove', function(event) {
    banner.style.transform = `translate(${(event.x - (this.window.innerWidth/2)) / this.window.innerWidth * 40}px, ${(event.y - (this.window.innerHeight/2)) / this.window.innerHeight * 25}px`;
});