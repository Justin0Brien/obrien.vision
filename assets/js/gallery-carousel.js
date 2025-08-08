/**
 * Gallery and Carousel Components for Jekyll Site
 * Lightweight, responsive image galleries and carousels
 */

class ImageGallery {
  constructor(container, options = {}) {
    this.container = document.querySelector(container);
    this.options = {
      lightbox: true,
      captions: true,
      lazy: true,
      columns: 'auto',
      gap: '1rem',
      ...options
    };
    
    this.init();
  }
  
  init() {
    if (!this.container) return;
    
    this.setupCSS();
    this.setupGallery();
    
    if (this.options.lightbox) {
      this.setupLightbox();
    }
    
    if (this.options.lazy) {
      this.setupLazyLoading();
    }
  }
  
  setupCSS() {
    const style = document.createElement('style');
    style.textContent = `
      .image-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: ${this.options.gap};
        margin: 2rem 0;
      }
      
      .gallery-item {
        position: relative;
        overflow: hidden;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: transform 0.3s ease;
      }
      
      .gallery-item:hover {
        transform: scale(1.02);
      }
      
      .gallery-item img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        display: block;
      }
      
      .gallery-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.8));
        color: white;
        padding: 1rem;
        transform: translateY(100%);
        transition: transform 0.3s ease;
      }
      
      .gallery-item:hover .gallery-caption {
        transform: translateY(0);
      }
      
      .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: none;
        z-index: 1000;
        align-items: center;
        justify-content: center;
      }
      
      .lightbox-content {
        max-width: 90%;
        max-height: 90%;
        position: relative;
      }
      
      .lightbox img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      
      .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.2);
        color: white;
        border: none;
        font-size: 2rem;
        padding: 1rem;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.3s ease;
      }
      
      .lightbox-nav:hover {
        background: rgba(255,255,255,0.3);
      }
      
      .lightbox-prev {
        left: -4rem;
      }
      
      .lightbox-next {
        right: -4rem;
      }
      
      .lightbox-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255,255,255,0.2);
        color: white;
        border: none;
        font-size: 1.5rem;
        padding: 0.5rem;
        cursor: pointer;
        border-radius: 50%;
      }
      
      .lightbox-caption {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        max-width: 80%;
        text-align: center;
      }
      
      @media (max-width: 768px) {
        .image-gallery {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        
        .lightbox-nav {
          display: none;
        }
      }
    `;
    
    if (!document.querySelector('#gallery-styles')) {
      style.id = 'gallery-styles';
      document.head.appendChild(style);
    }
  }
  
  setupGallery() {
    this.container.classList.add('image-gallery');
    const items = this.container.querySelectorAll('img');
    
    items.forEach((img, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'gallery-item';
      wrapper.dataset.index = index;
      
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
      
      if (this.options.captions && img.alt) {
        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.textContent = img.alt;
        wrapper.appendChild(caption);
      }
    });
  }
  
  setupLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="" alt="">
        <button class="lightbox-nav lightbox-prev">‹</button>
        <button class="lightbox-nav lightbox-next">›</button>
        <button class="lightbox-close">✕</button>
        <div class="lightbox-caption"></div>
      </div>
    `;
    
    document.body.appendChild(lightbox);
    
    this.lightbox = lightbox;
    this.lightboxImg = lightbox.querySelector('img');
    this.lightboxCaption = lightbox.querySelector('.lightbox-caption');
    this.currentIndex = 0;
    
    // Event listeners
    this.container.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (item) {
        this.openLightbox(parseInt(item.dataset.index));
      }
    });
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      this.closeLightbox();
    });
    
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
      this.navigateLightbox(-1);
    });
    
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
      this.navigateLightbox(1);
    });
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        this.closeLightbox();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (lightbox.style.display === 'flex') {
        switch(e.key) {
          case 'Escape':
            this.closeLightbox();
            break;
          case 'ArrowLeft':
            this.navigateLightbox(-1);
            break;
          case 'ArrowRight':
            this.navigateLightbox(1);
            break;
        }
      }
    });
  }
  
  openLightbox(index) {
    const images = this.container.querySelectorAll('img');
    if (index >= 0 && index < images.length) {
      this.currentIndex = index;
      const img = images[index];
      
      this.lightboxImg.src = img.src;
      this.lightboxImg.alt = img.alt;
      this.lightboxCaption.textContent = img.alt || '';
      
      this.lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }
  
  closeLightbox() {
    this.lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  navigateLightbox(direction) {
    const images = this.container.querySelectorAll('img');
    this.currentIndex += direction;
    
    if (this.currentIndex < 0) {
      this.currentIndex = images.length - 1;
    } else if (this.currentIndex >= images.length) {
      this.currentIndex = 0;
    }
    
    this.openLightbox(this.currentIndex);
  }
  
  setupLazyLoading() {
    const images = this.container.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });
      
      images.forEach(img => {
        if (img.dataset.src) {
          observer.observe(img);
        }
      });
    }
  }
}

class ImageCarousel {
  constructor(container, options = {}) {
    this.container = document.querySelector(container);
    this.options = {
      autoplay: false,
      interval: 5000,
      dots: true,
      arrows: true,
      infinite: true,
      ...options
    };
    
    this.currentSlide = 0;
    this.autoplayTimer = null;
    
    this.init();
  }
  
  init() {
    if (!this.container) return;
    
    this.setupCSS();
    this.setupCarousel();
    this.setupControls();
    
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }
  
  setupCSS() {
    const style = document.createElement('style');
    style.textContent = `
      .image-carousel {
        position: relative;
        overflow: hidden;
        border-radius: 0.5rem;
        margin: 2rem 0;
      }
      
      .carousel-track {
        display: flex;
        transition: transform 0.5s ease;
      }
      
      .carousel-slide {
        flex: 0 0 100%;
        position: relative;
      }
      
      .carousel-slide img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        display: block;
      }
      
      .carousel-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.8));
        color: white;
        padding: 2rem;
        text-align: center;
      }
      
      .carousel-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.2);
        color: white;
        border: none;
        font-size: 2rem;
        padding: 1rem;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.3s ease;
        z-index: 10;
      }
      
      .carousel-nav:hover {
        background: rgba(255,255,255,0.3);
      }
      
      .carousel-prev {
        left: 1rem;
      }
      
      .carousel-next {
        right: 1rem;
      }
      
      .carousel-dots {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.5rem;
        z-index: 10;
      }
      
      .carousel-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
        border: none;
        cursor: pointer;
        transition: background 0.3s ease;
      }
      
      .carousel-dot.active {
        background: white;
      }
      
      @media (max-width: 768px) {
        .carousel-slide img {
          height: 250px;
        }
        
        .carousel-nav {
          font-size: 1.5rem;
          padding: 0.75rem;
        }
        
        .carousel-caption {
          padding: 1rem;
          font-size: 0.875rem;
        }
      }
    `;
    
    if (!document.querySelector('#carousel-styles')) {
      style.id = 'carousel-styles';
      document.head.appendChild(style);
    }
  }
  
  setupCarousel() {
    this.container.classList.add('image-carousel');
    
    const images = Array.from(this.container.querySelectorAll('img'));
    this.slides = images;
    
    const track = document.createElement('div');
    track.className = 'carousel-track';
    
    images.forEach((img, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.appendChild(img);
      
      if (img.alt) {
        const caption = document.createElement('div');
        caption.className = 'carousel-caption';
        caption.textContent = img.alt;
        slide.appendChild(caption);
      }
      
      track.appendChild(slide);
    });
    
    this.container.innerHTML = '';
    this.container.appendChild(track);
    this.track = track;
  }
  
  setupControls() {
    if (this.options.arrows && this.slides.length > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'carousel-nav carousel-prev';
      prevBtn.innerHTML = '‹';
      prevBtn.addEventListener('click', () => this.prevSlide());
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'carousel-nav carousel-next';
      nextBtn.innerHTML = '›';
      nextBtn.addEventListener('click', () => this.nextSlide());
      
      this.container.appendChild(prevBtn);
      this.container.appendChild(nextBtn);
    }
    
    if (this.options.dots && this.slides.length > 1) {
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'carousel-dots';
      
      this.slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => this.goToSlide(index));
        dotsContainer.appendChild(dot);
      });
      
      this.container.appendChild(dotsContainer);
      this.dots = dotsContainer.querySelectorAll('.carousel-dot');
    }
    
    // Touch/swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });
    
    this.container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });
    
    this.container.addEventListener('touchend', () => {
      if (!isDragging) return;
      
      const diffX = startX - currentX;
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
      
      isDragging = false;
    });
  }
  
  goToSlide(index) {
    if (index < 0 || index >= this.slides.length) return;
    
    this.currentSlide = index;
    this.track.style.transform = `translateX(-${index * 100}%)`;
    
    if (this.dots) {
      this.dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  }
  
  nextSlide() {
    const nextIndex = this.options.infinite 
      ? (this.currentSlide + 1) % this.slides.length
      : Math.min(this.currentSlide + 1, this.slides.length - 1);
    
    this.goToSlide(nextIndex);
  }
  
  prevSlide() {
    const prevIndex = this.options.infinite
      ? (this.currentSlide - 1 + this.slides.length) % this.slides.length
      : Math.max(this.currentSlide - 1, 0);
    
    this.goToSlide(prevIndex);
  }
  
  startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      this.nextSlide();
    }, this.options.interval);
    
    // Pause on hover
    this.container.addEventListener('mouseenter', () => {
      this.stopAutoplay();
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.startAutoplay();
    });
  }
  
  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
}

// Auto-initialize galleries and carousels
document.addEventListener('DOMContentLoaded', () => {
  // Initialize galleries
  document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const options = JSON.parse(gallery.dataset.gallery || '{}');
    new ImageGallery(gallery, options);
  });
  
  // Initialize carousels
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const options = JSON.parse(carousel.dataset.carousel || '{}');
    new ImageCarousel(carousel, options);
  });
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ImageGallery, ImageCarousel };
}
