// Main JavaScript for Interior Design Mood Board
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Color swatch interactions
    initColorSwatches();
    
    // Interactive typography samples
    initTypographySamples();
    
    // Component demonstrations
    initComponentDemos();
    
    // Scroll-triggered animations
    initScrollAnimations();
    
    // Theme toggle functionality (if needed)
    initThemeToggle();
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation state
                updateActiveNavLink(this);
            }
        });
    });
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

/**
 * Initialize color swatch interactions
 */
function initColorSwatches() {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const colorCode = this.dataset.color || this.querySelector('.color-code').textContent;
            const colorName = this.querySelector('.color-name').textContent;
            
            // Copy color code to clipboard
            copyToClipboard(colorCode, `${colorName} (${colorCode}) copied to clipboard!`);
            
            // Visual feedback
            showCopyFeedback(this);
        });
        
        // Add hover effect for better UX
        swatch.addEventListener('mouseenter', function() {
            const colorName = this.querySelector('.color-name');
            const colorCode = this.querySelector('.color-code');
            if (colorName && colorCode) {
                colorName.style.opacity = '1';
                colorCode.style.opacity = '1';
            }
        });
        
        swatch.addEventListener('mouseleave', function() {
            const colorName = this.querySelector('.color-name');
            const colorCode = this.querySelector('.color-code');
            if (colorName && colorCode && !this.classList.contains('copying')) {
                colorName.style.opacity = '0';
                colorCode.style.opacity = '0';
            }
        });
    });
}

/**
 * Initialize typography samples with interactive features
 */
function initTypographySamples() {
    const fontSamples = document.querySelectorAll('.font-sample');
    
    fontSamples.forEach(sample => {
        // Add click to copy font family
        sample.addEventListener('click', function() {
            const fontFamily = getComputedStyle(this).fontFamily;
            copyToClipboard(fontFamily, 'Font family copied to clipboard!');
            showCopyFeedback(this);
        });
        
        // Add tooltip showing font details
        sample.title = 'Click to copy font family';
    });
    
    // Typography hierarchy examples - make them interactive
    const hierarchyExamples = document.querySelectorAll('.hierarchy-examples > *');
    hierarchyExamples.forEach(example => {
        example.addEventListener('click', function() {
            const styles = getComputedStyle(this);
            const cssRule = `font-family: ${styles.fontFamily}; font-size: ${styles.fontSize}; font-weight: ${styles.fontWeight};`;
            copyToClipboard(cssRule, 'CSS styles copied to clipboard!');
            showCopyFeedback(this);
        });
        
        example.style.cursor = 'pointer';
        example.title = 'Click to copy CSS styles';
    });
}

/**
 * Initialize component demonstrations
 */
function initComponentDemos() {
    // Button hover effects are handled by CSS, but we can add click interactions
    const demoButtons = document.querySelectorAll('.button-examples .btn');
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification(`${this.textContent} clicked!`, 'info');
        });
    });
    
    // Form validation demo
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-gold)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = 'var(--color-border)';
            }
        });
    });
    
    // Project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const overlay = card.querySelector('.card-overlay');
        const button = overlay ? overlay.querySelector('.btn') : null;
        
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Project details would open here', 'info');
            });
        }
    });
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Update active navigation link based on visible section
                const sectionId = entry.target.id;
                if (sectionId) {
                    const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (correspondingNavLink) {
                        updateActiveNavLink(correspondingNavLink);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add animation classes to elements that should animate in
    const animatedElements = document.querySelectorAll(
        '.palette-card, .typography-card, .layout-card, .component-group, .personality-card, .analysis-card'
    );
    
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Create theme toggle button (optional - can be added to header)
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = savedTheme === 'light' ? '🌙' : '☀️';
    themeToggle.title = 'Toggle theme';
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        this.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
        
        showNotification(`Switched to ${newTheme} theme`, 'info');
    });
    
    // Uncomment to add theme toggle to header
    // const header = document.querySelector('.header .container');
    // if (header) {
    //     header.appendChild(themeToggle);
    // }
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text, message) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(message, 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text, message);
        });
    } else {
        fallbackCopyToClipboard(text, message);
    }
}

/**
 * Fallback copy to clipboard for older browsers
 */
function fallbackCopyToClipboard(text, message) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification(message, 'success');
    } catch (err) {
        showNotification('Could not copy to clipboard', 'error');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show copy feedback animation
 */
function showCopyFeedback(element) {
    element.classList.add('copying');
    
    setTimeout(() => {
        element.classList.remove('copying');
    }, 1000);
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: 'var(--space-md) var(--space-lg)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-white)',
        fontWeight: 'var(--font-weight-medium)',
        fontSize: 'var(--font-size-sm)',
        zIndex: 'var(--z-tooltip)',
        transform: 'translateX(100%)',
        transition: 'transform var(--transition-normal)',
        maxWidth: '300px',
        boxShadow: 'var(--shadow-lg)'
    });
    
    // Set background color based on type
    const colors = {
        success: 'var(--color-sage)',
        error: 'var(--color-terracotta)',
        info: 'var(--color-gold)',
        warning: 'var(--color-burgundy)'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
    
    // Allow manual dismiss
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

/**
 * Utility function to debounce function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility function to throttle function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS animations for scroll-triggered elements
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .copying {
        transform: scale(1.1) !important;
        box-shadow: 0 0 20px rgba(212, 165, 116, 0.5) !important;
    }
    
    .nav-link.active {
        color: var(--color-gold) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .theme-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--color-gold);
        color: var(--color-white);
        font-size: 20px;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        transition: all var(--transition-fast);
        z-index: var(--z-fixed);
    }
    
    .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow-xl);
    }
`;

document.head.appendChild(animationStyles);