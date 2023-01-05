import { Component, OnInit, OnDestroy } from '@angular/core';
import { reduce, filter, combineAll, take, takeUntil, tap  } from 'rxjs/operators';
import { Observable, interval, timer, of, Subject } from 'rxjs';

@Component({
	selector: 'app-operators',
	template: ` <div class="card" style="width: 90%; margin-left:20px;">
		<div class="card-body">
		<h2 class="card-title">Operators In RxJs</h2>
		<p class="card-text"></p>
		<ul>
			<li style="color:blue;">
			An operator is a pure function that takes a observable as an input and
			provide the output in also in the form of an observable. RxJS
			operators facilitate us to change the original observable in some
			manner and return a new observable. The operators do not change the
			existing observable. They simply modify it and return a new one.
			Operators are known as the type of functions that do not modify the
			variables outside of its scope.
			</li>
			<li style="color:red;">
			We need a pipe() method to work with operators.
			</li>
			<li>
			Type of operators - Static Operators: The static operators are
			generally used to create observables. Instance Operators: The instance
			operators are methods on observable instances.
			</li>
			<li style="color:blue;">
			The take, takeUntil, takeWhile & takeLast operators allow us to filter
			out the emitted values from the observable.
			</li>
			<li>
			<ul>
				<li>
					The take(n) emits the first n values, while takeLast(n) emits the
					last n values.
				</li>

				<li>
					The takeUntil(notifier) keeps emitting the values until it is
					notified to stop. Example - 
						<button (click)="stopObs()">Stop</button>
				</li>
				<li>
					takeWhile(predicate) emits the value while values satisfy the
					predicate. Syntax - <br/>
					takeWhile(predicate: function(value, index): boolean,inclusive?: boolean): Observable
					<p> 
						Where predicate is the condition.
						If inclusive is true, then the emits the value, 
						which does not pass the condition before terminating the observable.
					</p>
					</li>
				<li>All of the stops emitting once done.</li>
			</ul>
			</li>
			<li style="color:blue;">
			Of - operator used to create observables in short syntax.
			</li>
			<li style="color:red;"></li>
			<li style="color:blue;"></li>
		</ul>
		<div>
			<pre>
				<code>
					{{ code_snippet }}
				</code>
			</pre>
		</div>
		</div>
	</div>`,
	//styleUrls: ['./operators.component.css']
})

export class OperatorsComponent implements OnInit, OnDestroy {
	code_snippet = ``;
	notifier = new Subject<void>();
	obsTakeUntilNotifier = interval(1000).pipe(takeUntil(this.notifier));
	constructor() {
		/**
		 * Interval, map and take operator
		 * Pipe method with CombineAll operators
		 * 2 values from source will map to 2 (inner) interval observables that emit every 1s.
		 * combineAll uses combineLatest strategy, emitting the last value from each whenever either observable emits a value
		*/
		const numbers = interval(1000);
		const takeFourNumbers = numbers.pipe(take(4)); //if take operator not use it will continue to emit values
		takeFourNumbers.subscribe(x => console.log('Interval operator next: ', x));
		/**
		 * Timer Operator
		 * - declare the RxJS timer.
		 * - subscribe timer
		 * - Unsubscribe timer
		 */
		const sourceTimer = timer(1000, 2000);
		const subscribeTimer = sourceTimer.subscribe((val) => console.log(val));
		setTimeout(() => {
			subscribeTimer.unsubscribe();
		}, 12000);

		/**
		 * of operator
		*/
		let ofOperatedObservable = of(1,2,3,4,5,6,7,89,10,11,12,13.14,15)
		let alterationCase1 = ofOperatedObservable.pipe(
			filter(val => val % 2 === 0),
			reduce((acc, val) => acc+val, 0)
		);
		alterationCase1.subscribe((data)=>{
			console.log(`data from of operator is - `, data);
		});
	}
	stopObs() {
		this.notifier.next();
		this.notifier.complete();
	}
	ngOnInit(): void {
		/**
		 * Takeuntil operator and subscribe notifier
		*/
		this.obsTakeUntilNotifier.subscribe(val => {
			console.log('take until operator use to get values from observables, it only stop when notifier stop.');
			return console.log(`To stop click button & send notification to  observer -${val}`);
		});
	}
	ngOnDestroy(): void {
		console.log(`ng destroy called`);
		this.notifier.next();
		this.notifier.complete();
	}
	
}
