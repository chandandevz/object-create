# Chandan's Portfolio Website

A stunning, modern portfolio website featuring cool 3D animations and interactive JavaScript projects. Built with Three.js, GSAP animations, and modern web technologies.

## ✨ Features

### 🎨 Visual Design
- **Modern Dark Theme**: Sleek dark design with gradient accents
- **Responsive Layout**: Fully responsive design that works on all devices
- **Glass Morphism**: Beautiful glassmorphism effects with backdrop blur
- **Smooth Animations**: GSAP-powered scroll animations and transitions

### 🚀 3D Animations
- **Hero Section**: Floating geometric shapes with Three.js
- **About Section**: DNA-like double helix animation
- **Project Cards**: Unique 3D animations for each project showcase
- **Interactive Elements**: Mouse-responsive 3D canvas elements

### 📱 Interactive Features
- **Smooth Scrolling**: Seamless navigation between sections
- **Mobile Menu**: Responsive hamburger menu for mobile devices
- **Contact Form**: Functional contact form with validation
- **Hover Effects**: Rich hover animations on cards and buttons
- **Typing Effect**: Animated typing effect for the hero title

### 🛠️ JavaScript Projects Showcase
1. **3D Interactive Gallery** - Three.js powered 3D gallery
2. **Particle System Simulator** - Real-time particle physics
3. **Interactive Data Visualization** - Dynamic charts and graphs
4. **WebGL Shader Playground** - Custom shader editor

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Modern JavaScript features
- **Three.js**: 3D graphics and animations
- **GSAP**: Advanced animations and scroll triggers

### Libraries & Dependencies
- **Three.js r128**: 3D graphics library
- **GSAP 3.12.2**: Animation library
- **Font Awesome 6.0.0**: Icon library
- **Google Fonts (Inter)**: Typography

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Enjoy** the interactive portfolio!

### For Development

If you want to run it locally with a server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📁 Project Structure

```
portfolio2/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality and 3D animations
└── README.md           # This file
```

## 🎯 Customization Guide

### Personal Information
Edit the following sections in `index.html`:

1. **Name and Title**: Update the hero section
2. **About Me**: Modify the about section content
3. **Projects**: Replace with your own projects
4. **Skills**: Update your skills and technologies
5. **Contact**: Update contact information

### Styling
Modify `styles.css` to customize:

- **Colors**: Update CSS custom properties for theme colors
- **Fonts**: Change font families and sizes
- **Animations**: Adjust animation timings and effects
- **Layout**: Modify grid layouts and spacing

### 3D Animations
Customize `script.js` to modify:

- **Hero Animation**: Change geometric shapes and colors
- **About Animation**: Modify the DNA helix parameters
- **Project Animations**: Update individual project animations
- **Performance**: Adjust animation frame rates and complexity

### Adding New Projects

1. **Add HTML Structure**:
```html
<div class="project-card" data-project="5">
    <div class="project-visual">
        <div class="project-canvas" id="project-5-canvas"></div>
        <!-- ... rest of structure -->
    </div>
</div>
```

2. **Add CSS Styling** (if needed)

3. **Add JavaScript Animation**:
```javascript
// In script.js, add to initProjectScenes()
case 5: // Your New Project
    this.createYourProjectScene(scene, meshes);
    break;
```

## 🎨 Color Scheme

The portfolio uses a modern dark theme with these primary colors:

- **Primary Blue**: `#667eea`
- **Secondary Purple**: `#764ba2`
- **Accent Pink**: `#f093fb`
- **Background Dark**: `#0a0a0a`
- **Background Light**: `#1a1a2e`

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Performance Optimizations

- **Debounced scroll events** for smooth performance
- **RequestAnimationFrame** for 3D animations
- **Optimized Three.js scenes** with proper cleanup
- **Lazy loading** of animations on scroll
- **Efficient CSS animations** using transform properties

## 🌟 Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements, consider sharing them!

## 📞 Contact

For questions or support, feel free to reach out through the contact form on the website.

---

**Built with ❤️ using modern web technologies**
