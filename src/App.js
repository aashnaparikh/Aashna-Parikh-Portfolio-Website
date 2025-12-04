import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, FileText } from 'lucide-react';

const Portfolio = () => {
  // Load NTR font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=NTR&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [aboutVisible, setAboutVisible] = useState(false);
  const fullText = 'hi there, I am aashna :)!';
  const typingSpeed = 100;

  // Smooth scroll handler
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Typing effect that regenerates every 10 seconds
  useEffect(() => {
    let currentIndex = 0;
    let typingInterval;
    let resetTimeout;

    const startTyping = () => {
      currentIndex = 0;
      setText('');
      
      typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          // Wait 10 seconds then restart
          resetTimeout = setTimeout(() => {
            startTyping();
          }, 10000);
        }
      }, typingSpeed);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(resetTimeout);
    };
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Particle background effect
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((particleA, indexA) => {
        particles.slice(indexA + 1).forEach(particleB => {
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Geometric Astrology Animation
  useEffect(() => {
    const canvas = document.getElementById('astro-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 300;
    
    let time = 0;
    
    // Center point
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Define celestial bodies with orbits
    const celestialBodies = [
      { radius: 60, speed: 1, size: 8, color: '#bb86fc', glow: 15 },
      { radius: 90, speed: -0.7, size: 6, color: '#e1bee7', glow: 12 },
      { radius: 120, speed: 0.5, size: 10, color: '#bb86fc', glow: 18 },
      { radius: 45, speed: -1.5, size: 5, color: '#d1c4e9', glow: 10 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.015;

      // Draw center sun/star
      const centerPulse = Math.sin(time * 2) * 2 + 12;
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, centerPulse + 10);
      centerGlow.addColorStop(0, 'rgba(187, 134, 252, 1)');
      centerGlow.addColorStop(0.5, 'rgba(187, 134, 252, 0.5)');
      centerGlow.addColorStop(1, 'rgba(187, 134, 252, 0)');
      
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerPulse + 10, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#bb86fc';
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerPulse, 0, Math.PI * 2);
      ctx.fill();

      // Draw orbit paths
      celestialBodies.forEach(body => {
        ctx.strokeStyle = 'rgba(187, 134, 252, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, body.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw geometric markers on orbit (12 points like zodiac)
        for (let i = 0; i < 12; i++) {
          const angle = (Math.PI * 2 / 12) * i;
          const x = centerX + body.radius * Math.cos(angle);
          const y = centerY + body.radius * Math.sin(angle);
          
          ctx.fillStyle = 'rgba(187, 134, 252, 0.2)';
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw orbiting bodies
      celestialBodies.forEach(body => {
        const angle = time * body.speed;
        const x = centerX + body.radius * Math.cos(angle);
        const y = centerY + body.radius * Math.sin(angle);

        // Draw glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, body.glow);
        gradient.addColorStop(0, body.color);
        gradient.addColorStop(0.5, body.color.replace(')', ', 0.3)').replace('rgb', 'rgba'));
        gradient.addColorStop(1, 'rgba(187, 134, 252, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, body.glow, 0, Math.PI * 2);
        ctx.fill();

        // Draw body
        ctx.fillStyle = body.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = body.color;
        ctx.beginPath();
        ctx.arc(x, y, body.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw geometric shapes around bodies
        ctx.strokeStyle = body.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.6;
        
        // Rotating hexagon around each body
        const hexRotation = time * 2;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(hexRotation);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const hexAngle = (Math.PI / 3) * i;
          const hx = (body.size + 8) * Math.cos(hexAngle);
          const hy = (body.size + 8) * Math.sin(hexAngle);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        
        ctx.globalAlpha = 1;
      });

      // Draw connecting lines between bodies (constellation effect)
      ctx.strokeStyle = 'rgba(187, 134, 252, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < celestialBodies.length; i++) {
        for (let j = i + 1; j < celestialBodies.length; j++) {
          const angle1 = time * celestialBodies[i].speed;
          const x1 = centerX + celestialBodies[i].radius * Math.cos(angle1);
          const y1 = centerY + celestialBodies[i].radius * Math.sin(angle1);
          
          const angle2 = time * celestialBodies[j].speed;
          const x2 = centerX + celestialBodies[j].radius * Math.cos(angle2);
          const y2 = centerY + celestialBodies[j].radius * Math.sin(angle2);
          
          const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          
          if (distance < 150) {
            ctx.globalAlpha = (150 - distance) / 150 * 0.3;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // Intersection Observer for About section fade-in
  useEffect(() => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAboutVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    observer.observe(aboutSection);

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#1a0033',
      minHeight: '100vh',
      color: 'white',
      fontFamily: "'NTR', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      scrollBehavior: 'smooth'
    }}>
      {/* Particle Canvas Background */}
      <canvas 
        id="particle-canvas" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Navigation Bar */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2rem 4rem',
          backgroundColor: 'transparent',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(26, 0, 51, 0.8)'
        }}>
          {/* Left side - Name and Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
            <div style={{ 
              fontSize: '1.2rem',
              fontWeight: '400',
              transition: 'all 0.3s ease',
              textShadow: '0 0 0px rgba(187, 134, 252, 0)',
              cursor: 'pointer'
            }}
            onClick={(e) => handleNavClick(e, 'home')}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#bb86fc';
              e.currentTarget.style.textShadow = '0 0 15px rgba(187, 134, 252, 0.8)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.textShadow = '0 0 0px rgba(187, 134, 252, 0)';
            }}
            >
              Aashna Parikh
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {['Home', 'About', 'Experience', 'Project', 'Research'].map(item => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  style={{ 
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.05rem',
                    opacity: 0.9,
                    transition: 'all 0.3s ease',
                    textShadow: '0 0 0px rgba(187, 134, 252, 0)',
                    transform: 'scale(1)',
                    display: 'inline-block'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.color = '#bb86fc';
                    e.currentTarget.style.textShadow = '0 0 15px rgba(187, 134, 252, 0.8)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.textShadow = '0 0 0px rgba(187, 134, 252, 0)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a 
              href="mailto:aashnap2510@gmail.com"
              style={{ 
                color: 'white', 
                opacity: 0.9, 
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = '#bb86fc';
                e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(187, 134, 252, 0.8))';
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(187, 134, 252, 0))';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Mail size={20} />
            </a>
            <a 
              href="https://github.com/aashnaparikh"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: 'white', 
                opacity: 0.9, 
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = '#bb86fc';
                e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(187, 134, 252, 0.8))';
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(187, 134, 252, 0))';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/aashnaparikh"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: 'white', 
                opacity: 0.9, 
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = '#bb86fc';
                e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(187, 134, 252, 0.8))';
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(187, 134, 252, 0))';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="#cv"
              onClick={(e) => handleNavClick(e, 'cv')}
              style={{ 
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.05rem',
                opacity: 0.9,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                textShadow: '0 0 0px rgba(187, 134, 252, 0)',
                transform: 'scale(1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = '#bb86fc';
                e.currentTarget.style.textShadow = '0 0 15px rgba(187, 134, 252, 0.8)';
                e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(187, 134, 252, 0.8))';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.textShadow = '0 0 0px rgba(187, 134, 252, 0)';
                e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(187, 134, 252, 0))';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FileText size={20} />
              cv
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <main id="home" style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', width: '100%' }}>
            {/* Geometric Astrology Animation */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '1.5rem'
            }}>
              <canvas 
                id="astro-canvas"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(187, 134, 252, 0.3))'
                }}
              />
            </div>

            {/* Main Heading with Typing Effect */}
            <h1 style={{
              fontSize: '4rem',
              marginBottom: '1.5rem',
              fontWeight: 'bold',
              letterSpacing: '-0.02em'
            }}>
              {text.split('aashna').map((part, index) => (
                <React.Fragment key={index}>
                  {part}
                  {index < text.split('aashna').length - 1 && (
                    <span style={{ color: '#bb86fc', fontWeight: '900' }}>aashna</span>
                  )}
                </React.Fragment>
              ))}
              <span style={{ 
                opacity: showCursor ? 1 : 0,
                transition: 'opacity 0.1s'
              }}>|</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '1.75rem',
              marginBottom: '2.5rem',
              opacity: 0.9,
              fontWeight: '400'
            }}>
              Always juggling too many things at once.
            </p>

            {/* Description */}
            <p style={{
              fontSize: '1.25rem',
              lineHeight: '1.8',
              marginBottom: '3rem',
              opacity: 0.85,
              fontWeight: '300'
            }}>
              I'm a second-year Computer Science student at the University of Victoria, fascinated by all things tech. Lately, I've been exploring areas like Cybersecurity, Big Data, and even Project Management—I love diving into new challenges and seeing where they take me.
            </p>

            {/* Say Hi Button */}
            <a 
              href="mailto:aashnap2510@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid white',
                color: 'white',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontSize: '1.15rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 0 0px rgba(187, 134, 252, 0)',
                transform: 'scale(1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(187, 134, 252, 0.8)';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.borderColor = '#bb86fc';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 0 0px rgba(187, 134, 252, 0)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'white';
              }}
            >
              <Mail size={22} />
              <span>Say Hi!</span>
            </a>
          </div>
        </main>

        {/* About Section */}
        <section 
          id="about"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 8rem 5rem',
            opacity: aboutVisible ? 1 : 0,
            transform: aboutVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 1s ease-out, transform 1s ease-out'
          }}
        >
          <div style={{ maxWidth: '1200px', width: '100%' }}>
            {/* Two Column Layout - Square Image Centered */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2.5fr 1fr',
              gap: '5rem',
              alignItems: 'center'
            }}>
              {/* Left Column - Header + Text Content */}
              <div>
                {/* About Me Header with Line */}
                <div style={{ 
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  opacity: aboutVisible ? 1 : 0,
                  transform: aboutVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
                }}>
                  <h2 style={{
                    fontSize: '2.75rem',
                    color: 'white',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    fontWeight: '400'
                  }}>
                    / <span style={{ color: '#bb86fc', fontWeight: '900' }}>about</span> me
                  </h2>
                  <div style={{
                    flex: 1,
                    height: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    transformOrigin: 'left',
                    transform: aboutVisible ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 1s ease-out 0.3s'
                  }}></div>
                </div>

                {/* Text Content */}
                <div style={{
                  opacity: aboutVisible ? 1 : 0,
                  transform: aboutVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s'
                }}>
                  <p style={{
                    fontSize: '1.2rem',
                    lineHeight: '2',
                    marginBottom: '1.5rem',
                    opacity: 0.9,
                    textAlign: 'justify'
                  }}>
                    I am a <span style={{ color: '#bb86fc', fontWeight: 'bold' }}>second year</span> computer science who is passionate about empowering <span style={{ color: '#bb86fc', fontWeight: 'bold' }}>women in technology</span> and actively participate in <span style={{ color: '#bb86fc', fontWeight: 'bold' }}>various clubs</span> and initiatives that support this mission. From hackathons to workshops, I enjoy connecting with like-minded people and creating spaces where everyone can thrive.
                  </p>

                  {/* Technologies */}
                  <div>
                    <h3 style={{
                      fontSize: '1.35rem',
                      marginBottom: '1.5rem',
                      fontWeight: '400'
                    }}>
                      Technologies I work with:
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.75rem',
                      fontSize: '1.1rem',
                      opacity: 0.85,
                      marginBottom: '1.5rem'
                    }}>
                      {['Java', 'Python', 'Javascript ES6+', 'React.js', 'R'].map((tech, index) => (
                        <div 
                          key={tech} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem',
                            opacity: aboutVisible ? 1 : 0,
                            transform: aboutVisible ? 'translateX(0)' : 'translateX(-20px)',
                            transition: `opacity 0.5s ease-out ${0.8 + index * 0.1}s, transform 0.5s ease-out ${0.8 + index * 0.1}s`
                          }}
                        >
                          <span style={{ 
                            color: '#bb86fc', 
                            fontWeight: 'bold',
                            textShadow: '0 0 8px rgba(187, 134, 252, 0.6)',
                            fontSize: '1.2rem'
                          }}>▹</span>
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p style={{
                    fontSize: '1.2rem',
                    lineHeight: '2',
                    marginBottom: '2rem',
                    opacity: 0.9,
                    textAlign: 'justify'
                  }}>
                    Outside of work, I am interested in following the developments in politics. I also love listening to music, and watching crime documentaries.
                  </p>
                </div>
              </div>

              {/* Right Column - Perfect Square Image Centered */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: aboutVisible ? 1 : 0,
                transform: aboutVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s'
              }}>
                <img 
                  src="/image.jpg"
                  alt="Aashna Parikh"
                  style={{
                    width: '100%',
                    maxWidth: '350px',
                    aspectRatio: '1',
                    objectFit: 'cover',
                    borderRadius: '1rem',
                    border: '3px solid rgba(187, 134, 252, 0.4)',
                    boxShadow: '0 0 30px rgba(187, 134, 252, 0.4)',
                    transition: 'all 0.3s ease-out',
                    cursor: 'pointer',
                    transform: 'scale(1)',
                    filter: 'brightness(0.95)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 60px rgba(187, 134, 252, 1), 0 0 90px rgba(187, 134, 252, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(187, 134, 252, 1)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(187, 134, 252, 0.4)';
                    e.currentTarget.style.borderColor = 'rgba(187, 134, 252, 0.4)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.filter = 'brightness(0.95)';
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Placeholder sections for other menu items */}
        <section id="experience" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: '#bb86fc' }}>Experience Section (Coming Soon)</h2>
        </section>
        
        <section id="project" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: '#bb86fc' }}>Project Section (Coming Soon)</h2>
        </section>
        
        <section id="research" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: '#bb86fc' }}>Research Section (Coming Soon)</h2>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;