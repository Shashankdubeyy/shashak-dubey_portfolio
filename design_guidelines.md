# Design Guidelines: Shashank Dubey Portfolio

## Design Approach
**Reference-Based**: Drawing from modern portfolio sites with heavy animation emphasis (similar to Awwwards-winning portfolios), combined with clean React portfolio aesthetics. Focus on motion design, interactive elements, and visual depth through layering.

## Typography System

**Mixed Font Strategy**:
- **Cursive/Handwritten Font**: Use for "Hi I'm" introduction text, overlapping/layering on top of normal text
- **Sans-Serif Primary**: Clean, modern font for name "Shashank Dubey" and main headings
- **Overlap Technique**: Handwritten elements should visually overlap normal text creating depth and visual interest
- Font pairing example: Cursive intro sits slightly above and overlaps the main name text

**Hierarchy**:
- Hero headline: Large sans-serif with cursive overlay for greeting
- Section headings: Bold sans-serif, 2xl to 4xl
- Body text: Regular weight, readable size
- Accent text: Cursive for emphasis and personality

## Layout System

**Spacing**: Use Tailwind units of 4, 8, 12, 16 for consistency (p-4, m-8, gap-12, etc.)

**Header**: 
- Logo-only on left (SD logo variations provided)
- NO name text beside logo
- Center: Navigation links
- Right: Theme toggle + animated GitHub button

**Sections**: Full-width with contained content (max-w-6xl or 7xl), generous vertical spacing (py-16 to py-32)

## Component Library

### Loading Screen
- **Animation**: Zoom-in effect (scale from 0.5 or 0.8 to 1.0) - NOT upward slide
- **Logo**: Use provided SD logo variations as centerpiece
- **Progress**: Bold percentage counter at bottom-left (fixed position)
- **Transition**: Smooth fade + scale out when complete

### Buttons (Interactive + Textured)

**GitHub Buttons**:
- Header button: Icon + text with motion graphics on hover
- Project cards: "View Code" buttons with animated icons
- Hover states: Icon rotation, slide-in effects, gradient shifts

**CV Download Button**:
- Prominent placement in hero and footer
- Motion graphics on hover: scale, icon animation
- Texture overlay for tactile feel

**General Button Treatment**:
- Subtle noise/grain texture overlay
- Hover: Scale transform (1.05), ripple effect
- Active state: Slight scale down (0.98)
- Gradient backgrounds where appropriate
- Blur background if placed over images

### Project Cards
- Grid layout with 3D tilt effect on hover
- Info slide-up animation on desktop hover
- Texture/grain on card backgrounds
- Animated reveal with stagger (GSAP ScrollTrigger)
- GitHub + Live Demo buttons with hover animations

### Skills Section
- Grouped by category
- Animated proficiency bars (reveal on scroll)
- Staggered entry animation

### Interactive Elements
- All buttons: Ripple effect, scale, shadow changes
- Textured surfaces on interactive areas
- Smooth hover transitions (0.3s ease)
- Focus states with visible outlines

## Motion & Animation

**GSAP Animations**:
- Hero parallax background
- Scroll-triggered section reveals (stagger)
- Project card 3D tilts
- Skill bar fills
- Smooth page transitions with overlay

**Micro-interactions**:
- Button hover: scale + ripple + gradient
- GitHub/CV buttons: Icon rotations, slide-ins
- Card hovers: Lift + info reveal
- Particle effects in hero section
- Animated SVG section separators

**Animation Principles**:
- Smooth, polished timing (ease-out curves)
- Stagger delays for grouped elements
- Mobile: Reduced motion, simpler effects
- No janky or distracting animations

## Visual Enhancements

**Textures**:
- Subtle noise/grain overlays on buttons
- Textured backgrounds on cards
- Grain effect on interactive surfaces

**Depth & Layering**:
- Handwritten text overlapping normal text
- 3D transforms on cards
- Parallax layers in hero
- Shadow variations for elevation

**Accents**:
- Purple-to-cyan gradient palette (from logo)
- Vibrant gradient backgrounds
- Animated gradient shifts on hover
- Particle effects sparingly

## Images

**Hero Section**: 
- Full-width hero with parallax background (abstract tech pattern or gradient mesh)
- Particle overlay animation
- Blur background behind any CTAs

**Project Showcases**:
- Placeholder images for project screenshots
- Lazy-loaded, optimized
- Hover zoom effects

## Accessibility

- Keyboard navigation for all interactive elements
- Visible focus states (outline + glow)
- ARIA labels on icon buttons
- Reduced motion media query support
- Semantic HTML throughout

## Theme

**Dark Mode (Default)**:
- Deep backgrounds with gradient accents
- Purple-cyan gradient highlights
- High contrast text
- Glowing effects on interactive elements

**Light Mode**:
- Clean white backgrounds
- Softer purple-cyan accents
- Maintained contrast ratios

## Polish Requirements

- No visual hiccups or jarring transitions
- Smooth 60fps animations
- Optimized asset loading
- Progressive enhancement approach
- Production-ready quality throughout