import {Component, Input} from '@angular/core';

@Component({
  selector: 'unisport-loader',
  template: `
    <img src="assets/ball.svg" alt=""/> {{ text }}
  `,
  styles: [
    `:host {
      display: block;
    }
    `,
    `
      @keyframes bounce {
        0% {
          transform: scale(1, 1) translateY(0)
        }
        10% {
          transform: scale(1.1, .9) translateY(0)
        }
        30% {
          transform: scale(.9, 1.1) translateY(-10px)
        }
        50% {
          transform: scale(1.05, .95) translateY(0)
        }
        57% {
          transform: scale(1, 1) translateY(-1px)
        }
        64% {
          transform: scale(1, 1) translateY(0)
        }
        100% {
          transform: scale(1, 1) translateY(0)
        }
      }
    `,
    `
      img {
        animation-name: bounce;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
      }
    `
  ]

})
export class LoaderComponent {
  @Input() text = 'Lädt...';
}
