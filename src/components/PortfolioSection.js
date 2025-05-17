import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './PortfolioSection.css';

// Thumbnails
import thumbnail1 from '../assets/thumbnails/thumbnail1.jpg';
import thumbnail2 from '../assets/thumbnails/thumbnail2.png';
import thumbnail3 from '../assets/thumbnails/thumbnail3.png';
import thumbnail4 from '../assets/thumbnails/thumbnail4.png';
import thumbnail5 from '../assets/thumbnails/thumbnail5.png';

// Logos
import logo1 from '../assets/logos/logo1.png';
import logo2 from '../assets/logos/logo2.png';
import logo3 from '../assets/logos/logo3.png';
import logo4 from '../assets/logos/logo4.png';
import logo5 from '../assets/logos/logo5.png';

// Photoshop
import psd1 from '../assets/photoshop/psd1.jpg';
import psd2 from '../assets/photoshop/psd2.jpg';
import psd3 from '../assets/photoshop/psd3.jpg';
import psd4 from '../assets/photoshop/psd4.png';
import psd5 from '../assets/photoshop/psd5.png';
import psd6 from '../assets/photoshop/psd6.png';

const PortfolioSection = () => {
  // Image arrays with unique IDs
  const thumbnails = [
    { id: 1, src: thumbnail1 },
    { id: 2, src: thumbnail2 },
    { id: 3, src: thumbnail3 },
    { id: 4, src: thumbnail4 },
    { id: 5, src: thumbnail5 }
  ];

  const logos = [
    { id: 1, src: logo1 },
    { id: 2, src: logo2 },
    { id: 3, src: logo3 },
    { id: 4, src: logo4 },
    { id: 5, src: logo5 }
  ];

  const photoshop = [
    { id: 1, src: psd1 },
    { id: 2, src: psd2 },
    { id: 3, src: psd3 },
    { id: 4, src: psd4 },
    { id: 5, src: psd5 },
    { id: 6, src: psd6 }
  ];

  // Refs
  const sectionRef = useRef(null);
  const thumbTrackRef = useRef(null);
  const logoTrackRef = useRef(null);
  const psdTrackRef = useRef(null);

  // Animation controls
  const controls = useAnimation();

  // Infinite scroll with mouse/touch control
  useEffect(() => {
    // Create clones for seamless looping
    const createClones = (track, items) => {
      if (!track.current) return;
      
      const clones = items.map(item => (
        <motion.div 
          key={`clone-${item.id}`}
          className="slide-item"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={item.src} alt={`Design ${item.id}`} />
          <div className="shine-effect"></div>
        </motion.div>
      ));

      track.current.innerHTML = '';
      [...items, ...items, ...items].forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide-item';
        slide.innerHTML = `<img src="${item.src}" alt="Design ${item.id}" />`;
        track.current.appendChild(slide);
      });
    };

    createClones(thumbTrackRef, thumbnails);
    createClones(logoTrackRef, logos);
    createClones(psdTrackRef, photoshop);

    // Auto-scroll animation
    const animateScroll = (track, speed) => {
      if (!track.current) return;
      
      let position = 0;
      const slideWidth = track.current.children[0]?.offsetWidth || 300;
      const gap = 30;
      const totalWidth = (slideWidth + gap) * thumbnails.length;
      
      const scroll = () => {
        position -= speed;
        if (position <= -totalWidth) {
          position = 0;
          track.current.style.transition = 'none';
          track.current.style.transform = `translateX(${position}px)`;
          requestAnimationFrame(() => {
            track.current.style.transition = 'transform 0.5s linear';
          });
        } else {
          track.current.style.transform = `translateX(${position}px)`;
        }
        requestAnimationFrame(scroll);
      };
      
      scroll();
    };

    const thumbScroll = animateScroll(thumbTrackRef, 0.5);
    const logoScroll = animateScroll(logoTrackRef, 0.7);
    const psdScroll = animateScroll(psdTrackRef, 0.6);

    // Mouse/touch drag functionality
    const setupDrag = (track) => {
      if (!track.current) return;
      
      let isDown = false;
      let startX;
      let scrollLeft;
      let velocity = 0;
      let animationFrame;
      let lastTime = 0;
      
      const handleMouseDown = (e) => {
        isDown = true;
        startX = e.pageX - track.current.offsetLeft;
        scrollLeft = track.current.scrollLeft;
        cancelAnimationFrame(animationFrame);
      };
      
      const handleMouseLeave = () => {
        isDown = false;
      };
      
      const handleMouseUp = () => {
        isDown = false;
        // Apply momentum
        const applyMomentum = (time) => {
          if (!lastTime) lastTime = time;
          const delta = time - lastTime;
          lastTime = time;
          
          if (Math.abs(velocity) > 0.1) {
            track.current.scrollLeft += velocity * delta * 0.1;
            velocity *= 0.95; // Friction
            animationFrame = requestAnimationFrame(applyMomentum);
          }
        };
        animationFrame = requestAnimationFrame(applyMomentum);
      };
      
      const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.current.offsetLeft;
        const walk = (x - startX) * 2;
        const now = performance.now();
        velocity = (walk - (track.current.scrollLeft - scrollLeft)) / (now - lastTime);
        lastTime = now;
        track.current.scrollLeft = scrollLeft - walk;
      };
      
      // Touch events
      const handleTouchStart = (e) => {
        isDown = true;
        startX = e.touches[0].pageX - track.current.offsetLeft;
        scrollLeft = track.current.scrollLeft;
        cancelAnimationFrame(animationFrame);
      };
      
      const handleTouchMove = (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - track.current.offsetLeft;
        const walk = (x - startX) * 2;
        const now = performance.now();
        velocity = (walk - (track.current.scrollLeft - scrollLeft)) / (now - lastTime);
        lastTime = now;
        track.current.scrollLeft = scrollLeft - walk;
      };
      
      const handleTouchEnd = () => {
        isDown = false;
        // Apply momentum
        const applyMomentum = (time) => {
          if (!lastTime) lastTime = time;
          const delta = time - lastTime;
          lastTime = time;
          
          if (Math.abs(velocity) > 0.1) {
            track.current.scrollLeft += velocity * delta * 0.1;
            velocity *= 0.95; // Friction
            animationFrame = requestAnimationFrame(applyMomentum);
          }
        };
        animationFrame = requestAnimationFrame(applyMomentum);
      };
      
      // Add event listeners
      track.current.addEventListener('mousedown', handleMouseDown);
      track.current.addEventListener('mouseleave', handleMouseLeave);
      track.current.addEventListener('mouseup', handleMouseUp);
      track.current.addEventListener('mousemove', handleMouseMove);
      track.current.addEventListener('touchstart', handleTouchStart);
      track.current.addEventListener('touchmove', handleTouchMove);
      track.current.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        if (track.current) {
          track.current.removeEventListener('mousedown', handleMouseDown);
          track.current.removeEventListener('mouseleave', handleMouseLeave);
          track.current.removeEventListener('mouseup', handleMouseUp);
          track.current.removeEventListener('mousemove', handleMouseMove);
          track.current.removeEventListener('touchstart', handleTouchStart);
          track.current.removeEventListener('touchmove', handleTouchMove);
          track.current.removeEventListener('touchend', handleTouchEnd);
        }
      };
    };

    setupDrag(thumbTrackRef);
    setupDrag(logoTrackRef);
    setupDrag(psdTrackRef);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            controls.start("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      className="portfolio-section"
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Floating Particles */}
      <div className="particles-container"></div>
      
      {/* Glow Effects */}
      <div className="glow-effect pink"></div>
      <div className="glow-effect blue"></div>
      
      <motion.div className="portfolio-header" variants={itemVariants}>
        <h2>Our <span className="highlight-text">Creative</span> Showcase</h2>
        <p>Experience our work through this <span className="highlight-text">immersive</span> gallery</p>
      </motion.div>
      
      {/* Thumbnails Slider */}
      <motion.div className="slider-container" variants={itemVariants}>
        <h3 className="slider-title">
          <span className="slider-icon">🎨</span>
          Thumbnail Designs
        </h3>
        <div className="slider-wrapper">
          <div className="slider-track" ref={thumbTrackRef}></div>
        </div>
      </motion.div>
      
      {/* Logos Slider */}
      <motion.div className="slider-container" variants={itemVariants}>
        <h3 className="slider-title">
          <span className="slider-icon">✨</span>
          Logo Designs
        </h3>
        <div className="slider-wrapper">
          <div className="slider-track" ref={logoTrackRef}></div>
        </div>
      </motion.div>
      
      {/* Photoshop Slider */}
      <motion.div className="slider-container" variants={itemVariants}>
        <h3 className="slider-title">
          <span className="slider-icon">🖌️</span>
          Photoshop Designs
        </h3>
        <div className="slider-wrapper">
          <div className="slider-track" ref={psdTrackRef}></div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default PortfolioSection;