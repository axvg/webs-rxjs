import { fromEvent, interval, map, takeUntil } from "rxjs";

let startButton = document.querySelector<HTMLButtonElement>('#start-button')!
let stopButton = document.querySelector<HTMLButtonElement>('#stop-button')!
let resultsArea = document.querySelector<HTMLElement>('.output')!;

let tenthSecond$ = interval(100);
let startClick$ = fromEvent(startButton, 'click');
let stopClick$ = fromEvent(stopButton, 'click');

startClick$.subscribe(() => {
    tenthSecond$
        .pipe(
            map(num => num / 10),
            takeUntil(stopClick$)
        )
        .subscribe(num => resultsArea.innerText = num + 's');
})