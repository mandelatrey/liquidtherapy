# Video Positioning Issue Analysis & Fix Plan

## Current Problem
The video in the hero section shifts to the bottom corner between screen widths 740px-823px instead of staying centered, despite CSS rules intended to keep it centered.

## Root Cause Analysis

### 1. CSS Conflicts
**Current video CSS (lines 135-143 in index.css):**
```css
video {
    @apply w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain;
}

@media (min-width: 824px) {
    video {
        @apply h-[80%] bottom-0 left-0 top-auto translate-x-0 translate-y-0;
    }
}
```

**Problem identified:** The `@media (min-width: 824px)` breakpoint doesn't align with Tailwind's responsive system, creating a gap where styles conflict.

### 2. GSAP Animation Interference
**In Hero.jsx (lines 13, 60-76):**
- `isMobile` is defined as `maxWidth: 767` 
- GSAP ScrollTrigger is applied to 'video' element with pin: true
- Different start/end values for mobile vs desktop

**Key conflict:** Between 768px-823px, GSAP thinks it's desktop mode but CSS thinks it's mobile mode.

### 3. HTML Structure Issues
**In Hero.jsx (line 124):**
```jsx
<div className="video">
    <video ref={videoRef} ... />
</div>
```

The video wrapper div has no positioning styles, which could interfere with the video's absolute positioning.

## Step-by-Step Fix Plan

### Step 1: Align Responsive Breakpoints
- Change CSS media query from `824px` to `768px` to match Tailwind's `md:` breakpoint
- This ensures consistency between CSS and GSAP responsive logic

### Step 2: Fix GSAP Media Query Logic
- Update `isMobile` in Hero.jsx from `maxWidth: 767` to `maxWidth: 767` (already correct)
- Ensure GSAP animations respect the same breakpoint as CSS

### Step 3: Simplify CSS Rules
- Remove complex transform combinations that might conflict
- Use simpler, more reliable positioning methods
- Ensure mobile-first approach with proper overrides

### Step 4: Test Video Container
- Verify that the video container div doesn't interfere
- Add necessary positioning to container if needed

## Implementation Steps

1. **Fix CSS Breakpoint Consistency**
   - Change media query from 824px to 768px
   - Ensure mobile styles apply below 768px, desktop above

2. **Simplify Video Positioning**
   - Use more straightforward centering approach for mobile
   - Clear overrides for desktop positioning

3. **Test Across All Breakpoints**
   - Verify 320px-767px (mobile) - should be centered
   - Verify 768px+ (desktop) - should be bottom-left
   - Pay special attention to 740px-823px range

## Expected Outcome
After implementation:
- Video stays perfectly centered on all screens below 768px
- Video moves to bottom-left on screens 768px and above
- No positioning jumps or conflicts in the 740px-823px range
