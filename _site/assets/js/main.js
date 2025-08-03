// Main JavaScript file for obrien.vision

document.addEventListener('DOMContentLoaded', function() {
    console.log('obrien.vision loaded');
    
    // Additional site-wide functionality can be added here
    // Note: Navigation and smooth scrolling are handled by navigation.js
});

// External link handling
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        e.target.setAttribute('target', '_blank');
        e.target.setAttribute('rel', 'noopener noreferrer');
    }
});
