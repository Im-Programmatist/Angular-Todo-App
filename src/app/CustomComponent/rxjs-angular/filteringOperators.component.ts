import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, debounce, debounceTime, map, distinct, elementAt, filter, first, last, skip, throttle } from 'rxjs/operators';
import { Observable, of, from, interval, timer, fromEvent  } from 'rxjs';

@Component({
	selector: 'app-operators',
	template: ` 
    <div class="card" style="width: 90%; margin-left:20px;">
		<div class="card-body">
		    <h2 class="card-title">Filtering Operators</h2>
            <div>
                <ul>
                    <li style="color:blue;">RxJS debounce() -  operator is a filtering operator that emits a value from the source Observable only after a while (exactly after a particular period). The emission is determined by another input given as Observable or promise.</li>
                    <li style="color:blue;">RxJS debounceTime() - operator is a filtering operator that emits a value from the source Observable only after completing a particular period without another source emission.</li>
                    <li><i>The RxJS debounce() operator is similar to the RxJS debounceTime() operator, but the period of emission silence is determined by a second Observable.</i></li>
                    <li style="color:blue;">RxJS elementAt() - operator is a filtering operator that emits a single value in a sequence of emissions from the source Observable after giving the specified index.</li>
                    <li style="color:blue;">RxJS filter() - operator is a filtering operator used to filter items emitted by the source observable according to the predicate function. It only emits those values that satisfy a specified predicate.</li>
                    <li style="color:blue;">RxJS first() - operator is a filtering operator that emits only the first value or the first value that meets some specified condition emitted by the source observable.</li>
                    <li style="color:blue;">RxJS last() - operator is a filtering operator that emits only the last value or the last value that meets some specified condition emitted by the source observable.</li>
                    <li style="color:blue;">RxJS skip() - operator is a filtering operator used to return an observable that skips the first count items emitted by the source observable.</li>
                    <li style="color:blue;">RxJS throttle() - operator is a filtering operator that emits a value from the source observable, then ignores subsequent source values for a specific duration determined by another observable, then repeats this process.</li>
                    <li style="color:blue;">RxJS distinct() - operator is a filtering operator that returns all the values from the source Observable that are distinct when compared with the previous values.</li>
                    <li style="color:red;"></li>
                </ul>
                <div>
                <br/>
                <label>Debouncing</label>
                <input id="searchBoxIdDebouncing" placeholder="checking debouncing from this box" />
                <br/>
                <label>Throttling</label>
                <input id="searchBoxIdThrottling" placeholder="checking throttling from this box" />
                <br/>
                    <pre>
                        <code>
                            {{ code_snippet }}
                        </code>
                    </pre>
                </div>
            </div>
		</div>
	</div>`,
	//styleUrls: ['./operators.component.css']
})

export class FilteringOperatorsComponent implements OnInit, OnDestroy {
	
    code_snippet = ``;
    debaounceObservable:any = "";

    constructor() {	
        /**
         * Debouncing - 
        */
        this.debaounceObservable = of(
            'first', 
            'second', 
            'third', 
            'fourth'
        );        
        const debouncedSample = this.debaounceObservable.pipe(debounce(() => timer(1000))); 
        //this will will return last value only
        //debounce function takes all emited value and check interval(pass to it) in emitted values, 
        //only return values which has specified time interval, 
        //thats why after last value there is no other value coming and interval condition fulfills 
        const subscribeDebounce = debouncedSample.subscribe((result)=>{console.log(result);});

        /**
         * Distinct
        */
        let sampleOfDistinctObs = of( 'first', 
        'second', 
        'third', 
        'second',
        'fourth',
        'first',1,2,1,3,5,2,3);  
        let distinctObs = sampleOfDistinctObs.pipe(distinct());  
        distinctObs.subscribe(x => console.log("The Distinct values are "+x)); 

        /**
         * Filter Operator
        */
        const filterSample = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);  
        //filter out non-even numbers  
        const filterObsVal = filterSample.pipe(filter(num => num % 3 === 0));  
        const subscribe = filterObsVal.subscribe(val => console.log(`Divisible by 3 numbers: ${val}`));
        
        /**
         * First - If we do no pass argument then emits first value from observable source
         * Last - If we do not pass argument then emits last value from observable source
         * Skip - it skip values mentioned in argument
        */
        //first
        const testFirstOperator = filterSample.pipe(first());
        const subscribe2 = testFirstOperator.subscribe(x => console.log(`first operator -${x}`))//return first
        const testFirstOperator2 = filterSample.pipe(first(num=> num === 5));
        const subscribe3 = testFirstOperator2.subscribe(x => console.log(`first operator -${x}`))//return first 5
        //last
        const testLastOperator = filterSample.pipe(last());
        const subscribe22 = testLastOperator.subscribe(x => console.log(`last operator -${x}`))//return last
        const testLastOperator2 = filterSample.pipe(last(num=> num % 2 == 0));
        const subscribe33 = testLastOperator2.subscribe(x => console.log(`last operator -${x}`))//return last element which is even
        //skip
        const testSkipOperator = filterSample.pipe(skip(3));//not allow empty 
        const subscribe222 = testSkipOperator.subscribe(x => console.log(`skip operator -${x}`))//skip first 3 and return all other
       
    }
	
    ngOnInit ():void { 
        /**
         * DebounceTime
        */ 
        console.log(`DebounceTime --->`);
        const searchBox = document.getElementById('searchBoxIdDebouncing');  
        const keyup$ = fromEvent(searchBox, 'keyup') // streams
        keyup$.pipe(  
            map((i: any) => i.currentTarget.value),  
            debounceTime(2000) // wait 2 second between keyups to emit current value  
        )  
        .subscribe(console.log); //This will give string from search box after waiting 2 seconds

        /**
         * elementAt 
        */
        const clicks = fromEvent(document, 'click');  
        const result = clicks.pipe(elementAt(2));  
        result.subscribe(x => console.log(x));  

        /**
         * throttle() - return value is observable that performs the throttle operation to limit the source's rate of emissions.
        */
        console.log(`Throttling--->`);
        const searchBoxThrottle = document.getElementById('searchBoxIdThrottling');
        const keyUpByThrottle = fromEvent(searchBoxThrottle, 'keyup') // streams
        //once take keyup it will go in 2 sec halt 
        keyUpByThrottle.pipe(
            throttle(val=>interval(2000)),
            map((i: any) => i.currentTarget.value),  
        ).subscribe((data) => console.log(`search box throttling data -${data}`));
        
        const throttleObs = interval(1000);//emit value after each second
        const sampleThrottlePipe = throttleObs.pipe(throttle(val=>interval(2000)));// make halt of 2 sec
        const subscribeThrottle = sampleThrottlePipe.subscribe((data) =>console.log(`throttle data ${data}`));    
    }

	ngOnDestroy(): void { }
	
}
