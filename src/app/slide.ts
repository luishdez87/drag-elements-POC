import { trigger, state, style, animate, transition } from '@angular/animations';

export const slide =
  trigger('slide', [
    state('void', style({opacity: 0, zIndex: 1, transform: 'translateX(100px)'})),
    transition(':enter, :leave', [
      animate(500)
    ])
  ]);

export const fromRight =
  trigger('fromRight', [
    state('void', style({opacity: 0, transform: 'translateX(500px)'})),
    transition(':enter', [
      animate(500)
    ])
  ]);

export const fromLeft =
  trigger('fromLeft', [
    state('void', style({opacity: 0, transform: 'translateX(-500px)'})),
    transition(':enter', [
      animate(500)
    ])
  ]);
