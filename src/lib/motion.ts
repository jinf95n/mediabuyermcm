import type { Transition, Variants } from 'framer-motion';

/** Shared easing + timing. Keep entrance durations in the 0.4–0.6s range. */
export const easeOut = [0.16, 1, 0.3, 1] as const;

const entranceTransition: Transition = { duration: 0.5, ease: easeOut };

/** Trigger once, a bit before the element is fully in view. */
export const viewportOnce = { once: true, margin: '-80px' } as const;

/** Default entrance: fade in + rise 20px. Use on section titles, panels, single blocks. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: entranceTransition },
};

/** Same as fadeInUp but slides in from the left — for side-by-side comparisons. */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: entranceTransition },
};

/** Same as fadeInUp but slides in from the right. */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: entranceTransition },
};

/** Opacity-only entrance for decorative/background elements. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: entranceTransition },
};

/**
 * Wrap a grid/list of items in a motion element with this variant (initial="hidden",
 * animate or whileInView="visible") so children using `fadeInUp` (or similar) as their
 * own `variants` prop animate in staggered, one after another.
 */
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Subtle lift for hoverable cards. */
export const cardHover = {
  scale: 1.02,
  transition: { duration: 0.2, ease: easeOut },
};

/** Micro-feedback for CTA buttons/links. */
export const ctaHover = {
  scale: 1.03,
  transition: { duration: 0.2, ease: easeOut },
};

export const ctaTap = {
  scale: 0.97,
  transition: { duration: 0.1 },
};
