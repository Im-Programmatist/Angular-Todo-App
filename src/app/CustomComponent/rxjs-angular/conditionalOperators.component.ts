import { Component, OnInit, OnDestroy } from '@angular/core';
import { every, find, defaultIfEmpty, isEmpty, findIndex } from 'rxjs/operators';
import { Observable, of, interval } from 'rxjs';

@Component({
	selector: 'app-operators',
	template: ` 
    <div class="card" style="width: 90%; margin-left:20px;">
		<div class="card-body">
		    <h2 class="card-title">Conditional Operators </h2>
            <div>
                <ul>
                    <li style="color:blue;">every() operator - 
                        returns an observable of booleans according to the input function satisfies the condition on each of the value on source observable.
                        If any one of element of source not satisfy then return false
                    </li>
                    <li style="color:blue;"> find() operator -
                        a conditional operator that returns only the first value emitted by the source observable as an output when it meets some specific conditions.
                    </li>
                    <li style="color:blue;">defaultIfEmpty - return a default value if the source observable is empty. </li>
                    <li style="color:blue;">isEmpty - operator return 'true' if observable complete it's callback(not emits anymore), else 'false'</li>
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
		</div>
	</div>`,
	//styleUrls: ['./operators.component.css']
})

export class ConditionalOperatorsComponent implements OnInit, OnDestroy {
	
    code_snippet = `https://www.javatpoint.com/rxjs-operators#Conditional`;

    constructor() {	}
	
    ngOnInit () {
        /**
         * Every operator : check condition with all element if any one of them doesn't satisfy then return false else true.
        */
        of(1, 2, 3, 4, 5, 6, 7, 8, 9).pipe(  
            every(x => x < 5),  
        ).subscribe(x => console.log(x)); //false
        const allEvenVal = of(2,4,6,8,10);
        const everyTrueExample =  allEvenVal.pipe(every(x=>x%2===0));
        everyTrueExample.subscribe(x => console.log(x)); //true 
        
        /**
         * find operator - it will find and return first element from obs when provided condition satisfy first time.
        */
        const obsFInd  = new Observable((observer)=>{
            observer.next(2);
            observer.next(3);
            observer.next(5);
            observer.next(7);
            observer.complete();
        })
        obsFInd.pipe(
            find((y:any) => y % 2 === 0 )
        );
        obsFInd.subscribe(()=>{});

        /** 
         * defaultIfEmpty - return a default value if the source observable is empty.
         * */ 
        //Here of() is empty thats why defaultIfEmpty will works and emit default value
        const defaultIfEmptySample1 = of().pipe(defaultIfEmpty('Observable.of() Empty!')); 
        const subscribe1 = defaultIfEmptySample1.subscribe(val => console.log(`Default operator result - ${val}`));
        //Here of/observable is not empty it will emit values not defaut message
        const defaultIfEmptySample2 = of(1, 2, 3, 4, 5, 6, 7, 8, 9).pipe(defaultIfEmpty('Observable.of() Not Empty!'));  
        const subscribe2 = defaultIfEmptySample2.subscribe(val => console.log(`Default operator result - ${val}`));  

        /**
         * isEmpty - Emit true for an empty Observable
        */
        let list1 = of();  
        let final_val = list1.pipe(isEmpty(),);  
        final_val.subscribe(x => console.log(x));  //return true
        let list2 = of(11, 22, 33, 44, 55, 66, 77, 88, 99);  
        let final_val2 = list2.pipe(isEmpty(),);  
        final_val2.subscribe(x => console.log(x));  
            
        /**
         * FindIndex - it will give index of value in observables
         * which comes FIRST from the source observable
        */
        let obsIndex = of(11, 23, 33, 44, 55, 66, 77, 88, 99);  
        let obsIndexPipe = obsIndex.pipe(findIndex(x => x % 2 === 0));  
        obsIndexPipe.subscribe(x => console.log(x)); //return indexes of value which are even numbers
    }

	ngOnDestroy(): void { }
	
}
