import { useEffect, useRef } from 'react';
import './Hero.css';

function Hero() {
  const titleRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      cursor.style.transform = `translate(${x - 15}px, ${y - 15}px)`;

      if (titleRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const moveX = (x - width / 2) * 0.1;
        const moveY = (y - height / 2) * 0.1;
        titleRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }

      const bg = document.querySelector('.hero-background');
      if (bg) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const posX = (x / width) * 100;
        const posY = (y / height) * 100;
        bg.style.backgroundPosition = `${posX}% ${posY}%`;
      }
    };

    document.addEventListener('mousemove', moveCursor);

    const createParticles = () => {
      const container = document.querySelector('.hero');
      if (!container) return;

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 6 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
        container.appendChild(particle);
      }
    };

    createParticles();

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="floating-shapes">
        <div className="shape triangle"></div>
        <div className="shape circle"></div>
        <div className="shape square"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title" ref={titleRef}>
          Awais Tahir
        </h1>

        <p className="hero-role">Creative Graphic Designer</p>

        <div className="underline">
          <div className="underline-inner"></div>
        </div>

        <p className="hero-subtitle">
          Crafting captivating thumbnails, logos, and Photoshop visuals that speak your brand's language.
        </p>

        <a
          href="https://wa.me/923213762964"
          className="whatsapp-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>WhatsApp: +92 321 3762964</span>
          <div className="whatsapp-icon">
            <svg viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
}

export default Hero;
