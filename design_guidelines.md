# Design Guidelines: Personal Trainer Landing Page

## Design Approach
**Reference-Based Approach**: Faithful replication of Mauro Castro's fitness consultancy landing page aesthetic - a high-conversion fitness landing page with bold red accents on black background, emphasizing trust, results, and professionalism.

## Core Design Principles
- **High-Impact Visual Contrast**: Dramatic black backgrounds with vibrant red accents for maximum attention
- **Trust & Social Proof**: Heavy emphasis on client results, testimonials, and credibility markers
- **Conversion-Focused**: Clear CTAs throughout, multiple pathways to pricing section
- **Professional Fitness Aesthetic**: Clean, modern, aspirational yet accessible

## Color Palette

### Primary Colors
- **Black Background**: 0 0% 0% - Main background for dramatic impact
- **Vibrant Red**: 0 100% 50% - Primary accent for CTAs and highlights
- **Pure White**: 0 0% 100% - Primary text and contrast elements

### Supporting Colors
- **WhatsApp Green**: 142 70% 49% - Floating chat button
- **Dark Gray**: 0 0% 15% - Card backgrounds and subtle variations
- **Red Glow**: 0 100% 50% with blur/shadow effects - Neon-style vertical bars

## Typography

### Font Families
- **Primary**: 'Montserrat', sans-serif - Headers and emphasis (bold, semi-bold)
- **Secondary**: 'Open Sans', sans-serif - Body text and descriptions (regular, light)
- Load via Google Fonts CDN

### Type Scale
- **Hero Headline**: text-4xl md:text-6xl font-bold uppercase tracking-wide
- **Section Headers**: text-3xl md:text-5xl font-bold uppercase
- **Subheadings**: text-xl md:text-2xl font-semibold
- **Body Text**: text-base md:text-lg leading-relaxed
- **Pricing**: text-4xl md:text-5xl font-bold
- **CTAs**: text-sm md:text-base font-bold uppercase tracking-wider

## Layout System

### Spacing Primitives
- **Consistent Units**: 4, 8, 16, 24, 32, 48, 64 (Tailwind: p-4, p-8, py-16, py-24, py-32, etc.)
- **Section Padding**: py-16 md:py-24 for standard sections, py-24 md:py-32 for hero
- **Container**: max-w-7xl mx-auto px-6 md:px-8

### Grid Structure
- **Hero**: Single column centered layout with image on right (desktop), stacked on mobile
- **Benefits**: Grid of 4 items (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- **Results Carousel**: Horizontal scrolling grid (grid-cols-1 md:grid-cols-3)
- **Pricing Cards**: 3 columns (grid-cols-1 md:grid-cols-3 gap-8)
- **FAQ**: Single column accordion-style

## Component Library

### Navigation
- Simple sticky header with logo (left) - white logo on transparent/black background
- Smooth scroll anchor links to #planos section
- Mobile: Hamburger menu if needed, but keep minimal

### Buttons
- **Primary CTA**: Yellow background (bg-yellow-400), black text, rounded-full px-8 py-4, uppercase, bold, hover:bg-yellow-500 transform hover:scale-105
- **Secondary CTA**: Outline variant with yellow border on black/image backgrounds, backdrop-blur-sm bg-black/30

### Hero Section
- **Background**: Solid black (bg-black)
- **Decorative Elements**: 2-3 vertical yellow bars with glow effect (absolute positioned, h-full w-1 bg-yellow-400 blur-sm)
- **Image**: Personal trainer photo on right side (desktop), full-width on mobile
- **Layout**: Text content on left 50%, image on right 50%

### Benefit Cards (Icons Grid)
- **Icons**: Use Font Awesome icons - smartphone, dumbbell, play-circle, whatsapp
- **Style**: White icons on black background, icon size 3xl
- **Layout**: Vertical stack with icon top, text below

### Results Carousel
- Horizontal scrolling container with before/after style images
- 3 testimonial images visible at once (desktop), 1 on mobile
- Smooth scroll-snap behavior

### Pricing Cards
- **Background**: Dark gray cards (bg-zinc-900) with yellow accent border-t-4
- **Badge**: Yellow "20% DE DESCONTO" tag for discounted plans
- **Features**: Checkmark list with yellow checkmarks
- **Price**: Large bold white text with installment info below
- **CTA**: Yellow button at bottom of each card

### Video Testimonials
- Embedded video players (placeholder iframes for Dailymotion/YouTube)
- 2-column grid on desktop, stack on mobile
- Client name below each video

### FAQ Accordion
- Black background with white text
- Yellow arrow icon for expand/collapse
- Smooth transition for expanding answers
- Hover state: subtle yellow left border

### Floating WhatsApp Button
- **Position**: Fixed bottom-right (bottom-8 right-8)
- **Style**: Green circular button (bg-green-500) with WhatsApp icon
- **Text**: "Como posso te ajudar?" tooltip on hover
- **Animation**: Subtle pulse effect

### Footer
- Black background with centered white/gray logo
- "Todos os Direitos Reservados©" text
- Minimal, single row layout

## Images & Assets

### Hero Image
- Professional photo of the personal trainer in workout attire or gym setting
- High-quality, well-lit, showing physique/professionalism
- Position: Right side of hero section (desktop), top on mobile

### Results/Testimonials
- Before/after style transformation photos
- Client testimonial images in carousel format
- Ensure authentic, high-quality photos

### Platform Screenshot
- Screenshot of training platform/app interface
- Shows digital aspect of the service

### Bio Section Image
- Professional headshot or action shot of trainer
- Circular or standard rectangular format

### Icons
- Font Awesome for all icons (smartphone, dumbbell, play, WhatsApp, checkmarks)
- Yellow color for accent icons

## Animations & Interactions
- **Smooth Scroll**: Implement smooth scrolling for anchor links
- **Hover Effects**: Scale transform on buttons (scale-105), color transitions
- **Carousel**: Horizontal scroll with snap points
- **FAQ Accordion**: Smooth max-height transitions
- **Entrance Animations**: Minimal - subtle fade-in on scroll if desired
- **Yellow Glow Effect**: CSS blur/shadow on vertical bar elements

## Accessibility
- Maintain high contrast ratios (yellow on black, white on black)
- Ensure all interactive elements have focus states (yellow outline/ring)
- Provide alt text for all images
- Semantic HTML for FAQ accordion (details/summary or proper ARIA)

## Responsive Behavior
- **Mobile-First**: Stack all multi-column layouts to single column
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Hero**: Image moves to top on mobile, text centers
- **Pricing Cards**: Stack vertically on mobile with full width
- **Text Sizing**: Scale down headlines by 33-50% on mobile
- **Spacing**: Reduce padding by 33-50% on mobile (py-24 → py-12)

## Content Sections Structure
1. **Header/Nav** - Logo, minimal
2. **Hero** - Title, subtitle, CTA, trainer image, yellow vertical bars
3. **Benefits Bar** - 4-icon grid showing key offerings
4. **Problem/Solution** - "Já se perguntou por que..." text section
5. **Results Carousel** - Client transformation images
6. **Process** - 4-step numbered list
7. **Target Audience** - "Minha consultoria é para você que" - 3 personas
8. **Video Testimonials** - 2 embedded videos
9. **Pricing** - 3-card pricing table with CTAs
10. **About Trainer** - Bio with photo
11. **FAQ** - 5-6 common questions
12. **Footer** - Logo, copyright
13. **Floating WhatsApp** - Always visible