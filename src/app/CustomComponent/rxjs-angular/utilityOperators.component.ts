import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, delayWhen, delay, observeOn, timeout, toArray, take, mapTo, filter, concatMap, catchError  } from 'rxjs/operators';
import { Observable, of, from, interval, merge, timer, animationFrameScheduler  } from 'rxjs';

@Component({
	selector: 'app-operators',
	template: ` 
    <div class="card" style="width: 90%; margin-left:20px;">
		<div class="card-body">
		    <h2 class="card-title">Utility Operators</h2>
            <div>
                <ul>
                    <li style="color:blue;">
                        tap	operator - contains the output, same as the source observable, and it can be used to log the values to the user from the observable.
                    </li>
                    <li style="color:blue;">
                        delay operator - is used to delay the values emitted from the source observable based on the timeout given
                        <br/>
                        delayWhen - on the timeout from another observable taken as input.    
                    </li>
                    <li style="color:blue;">
                        timeout operator - is used to throw an error if the source observable does not emit a value after the given timeout.
                    </li>
                    <li style="color:blue;">
                        toArray operator - is used to accumulate all the source values from the observable and provide their outputs as an array when the source completes.
                    </li>
                    <li style="color:red;"></li>
                    <li style="color:blue;"></li>
                </ul>
                <div>
                    <br/>
                        <input id="observeOnId" type="text" placeholder="test observeOn"/>
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
})

export class UtilityOperatorsComponent implements OnInit, OnDestroy {

    code_snippet = ``;

    constructor() {	
        /**
         * toArray Operator
        */
        const toArrayObs = of(1,2,3,4,5,6,7,8,9,10,11,12);
        const toArrayPipe = toArrayObs.pipe(take(5),toArray(), );//take only 5 from observables and  value in array  
        //provide all data in array not single value returns
        const subToArray = toArrayPipe.subscribe(data => console.log(`toArray operator data`, data));

        /**
         * mapTo, Delay &  operator
        */
        const delayObs = of(null);
        const message = merge(
            delayObs.pipe(mapTo("Hello")),
            delayObs.pipe(mapTo("programmers"), delay(1000)),
            delayObs.pipe(mapTo("welcome"), delay(4000)),//
            delayObs.pipe(mapTo("to"), delay(8000)),//lastly emit
            delayObs.pipe(mapTo("game"), delay(1000)), //it will emit after programmer           
        );//this will combine all result in one observable function
        const delaySub =  message.subscribe(
            (data: any) => 
                console.log(`data from map to and merge message using delay operator ${data}`
            )
        );//one by one result will print

        //emit value in 1 second time interval  
            const messageDelayedWhen = of(1,2,3,4,5,6,7);  
            //emit value after five seconds  
            const delayForFiveSeconds = () => timer(10000);  //make delay for 10 sec then emit all the value
            //after 5 seconds, start emitting delayed interval values  
            const delayWhenExample = messageDelayedWhen.pipe(delayWhen(delayForFiveSeconds));  
            //log values, delayed for 5 seconds   
            const subscribe = delayWhenExample.subscribe(val => console.log(`message delayed when ${val}`));  
    }
	
    ngOnInit () { 
        /**
         * Tap - it is allow to use callback in mid of emitting values
        */
        let tapObs = of(1, 2, 3, 4, 5, 6);  
        let tapPipe = tapObs.pipe(  
            tap(x => console.log("From tap() =" + x),  
                e => console.log(e),  
                () => console.log("Task completed")),  
            filter(a => a % 2 === 0)  
        );  
        tapPipe.subscribe(x => console.log("The even number is=" + x));  

        /**
         * 
        */
        let testDiv = document.getElementById("observeOnId");  
        const intervals = of(100,200,300,400,500,600,700,800,900,1000);  
        let case1 = intervals.pipe(  
           observeOn(animationFrameScheduler),  
        );  
        let sub1 = case1.subscribe(val => {  
           console.log(`Testing observeOn operator -`, val);  
        });  

        /**
         * Timeout
        */
        let timeoutInteval = interval(1000);  
        let final_val = timeoutInteval.pipe(timeout(new Date("January 24, 2023 15:53:00")));  
        final_val.subscribe(  
           x => console.log(`timeout ${x}`),  
           e => console.log(e),  
           () => console.log("Timeout task complete")  
        ); 
        // simulate request  
        function makeRequest(timeToDelay) {  
            return of('Request is Completed!').pipe(delay(timeToDelay));  
        }  
        of(8000, 7000, 6000, 5000, 4000, 3000, 2000)  
            .pipe(  
                concatMap(duration =>  
                    makeRequest(duration).pipe(  
                        timeout(2500),//due to 2.5 sec timeout more than this time request cancel only those less than timer could complete
                        catchError(error => of(`Request timed out after: ${duration}`))  
                    )  
                )  
            )  
        .subscribe(val => console.log(val));  
   
    }
	ngOnDestroy(): void { 

    }
}
