import { Component } from '@angular/core';
import { take, map, combineAll } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css'],
})
export class ObservablesComponent {
	// emit every 1s, take 2
	source$ = interval(1000).pipe(take(2));
	// map each emitted value from source to interval observable that takes 5 values
	example$ = this.source$.pipe(
		map((val) =>
			interval(1000).pipe(
			map((i) => `Result (${val}): ${i}`),
			take(5)
			)
		)
	);
	
	constructor(){
		/*
		2 values from source will map to 2 (inner) interval observables that emit every 1s.
		combineAll uses combineLatest strategy, emitting the last value from each
		whenever either observable emits a value
		*/
		this.example$
		.pipe(combineAll())
		/*
		output:
		["Result (0): 0", "Result (1): 0"]
		["Result (0): 1", "Result (1): 0"]
		["Result (0): 1", "Result (1): 1"]
		["Result (0): 2", "Result (1): 1"]
		["Result (0): 2", "Result (1): 2"]
		["Result (0): 3", "Result (1): 2"]
		["Result (0): 3", "Result (1): 3"]
		["Result (0): 4", "Result (1): 3"]
		["Result (0): 4", "Result (1): 4"]
		*/
		.subscribe(console.log);
	}
}
