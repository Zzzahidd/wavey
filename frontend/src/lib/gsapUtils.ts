import { gsap } from 'gsap';

/**
 * Attaches smooth mouse spotlight tracking to an element without 3D perspective / tilt
 */
export function attachMagneticCardTilt(
  element: HTMLElement,
  options: { maxTilt?: number; scale?: number; hasSpotlight?: boolean } = {}
) {
  const { hasSpotlight = true } = options;

  const handleMouseMove = (e: MouseEvent) => {
    if (hasSpotlight) {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      element.style.setProperty('--mouse-x', `${x}px`);
      element.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  element.addEventListener('mousemove', handleMouseMove);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
  };
}

/**
 * Creates continuous organic floating animation
 */
export function createContinuousFloat(
  target: string | HTMLElement | HTMLElement[],
  vars: { y?: number; x?: number; duration?: number; delay?: number } = {}
) {
  const { y = -8, x = 0, duration = 3.5, delay = 0 } = vars;
  return gsap.to(target, {
    y: `+=${y}`,
    x: `+=${x}`,
    duration,
    delay,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    overwrite: 'auto'
  });
}

/**
 * Creates animated number counter
 */
export function animateCounter(
  setter: (val: number) => void,
  start: number,
  end: number,
  duration = 1.2
) {
  const obj = { val: start };
  return gsap.to(obj, {
    val: end,
    duration,
    ease: 'power2.out',
    onUpdate: () => setter(Math.round(obj.val))
  });
}
