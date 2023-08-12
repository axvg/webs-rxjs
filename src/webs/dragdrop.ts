import { fromEvent, map, takeUntil } from "rxjs";

let draggable = <HTMLElement>document.querySelector('#draggable');

let mouseDown$ = fromEvent<MouseEvent>(draggable, 'mousedown');
let mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
let mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

mouseDown$.subscribe(() => {
    mouseMove$
        .pipe(
            map(ev => {
                ev.preventDefault();
                return {
                    x: ev.clientX,
                    y: ev.clientY
                }
            }),
            takeUntil(mouseUp$)
        )
        .subscribe(pos => {
            draggable.style.left = pos.x + 'px';
            draggable.style.top = pos.y + 'px';
        }
        )
})