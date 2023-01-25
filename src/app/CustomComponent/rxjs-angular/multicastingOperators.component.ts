import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, mapTo, multicast, publish, take } from 'rxjs/operators';
import { Observable, of, interval, Subject, ConnectableObservable  } from 'rxjs';

@Component({
	selector: 'app-operators',
	template: ` 
    <div class="card" style="width: 90%; margin-left:20px;">
		<div class="card-body">
		    <h2 class="card-title">Multicasting Operators</h2>
            <div>
                <ul>
                    <li style="color:blue;"></li>
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

export class MulticastingOperatorsComponent implements OnInit, OnDestroy {
	
    code_snippet = ``;
	observable$;

	constructor() { 
        /**
         * The RxJS multicast() operator is used to share the single subscription created with other subscribers.
        */
        var observable = new Observable(function subscribe(subscriber) {  
            try {  
               subscriber.next(Math.random());  
            } catch (e) {  
               subscriber.error(e);  
            }  
        });  
        /**
         *  The output Sub1 and Sub2 below will be different. 
         *  Because when the subscriber gets called, the observable restarts and gives the fresh value available.
        */
        const subscribe_one = observable.subscribe(val => console.log(  
            "Value received from Sub1 = "+val)  
        );  
         const subscribe_two = observable.subscribe(val => console.log(  
            "Value received from Sub2 = "+val)  
        );  
    }
	
    ngOnInit () { 

        /**
         *  But we need the subscribers getting called to have the same value.
         *  This is can be achieve by 'multicast '
        */
        var observableMultiCast = new Observable(function subscribe(subscriber) {  
            try {  
                subscriber.next(Math.random());  
            } catch (e) {  
                subscriber.error(e);  
            }  
        });  
        //const multi_op = multicast(new Subject<number>())(of(Math.random()).pipe(take(4)));
        const multi_op = observableMultiCast.pipe(multicast(() => new Subject()));  
        const sub1 =  multi_op.subscribe(val => {
            console.log(`Observer 2: ${val}`);
        }); 
        const sub2 =  multi_op.subscribe(val => {
            console.log(`Observer 3: ${val}`);
        }); 
        //multi_op.connect();  
        (multi_op as ConnectableObservable<number>).connect();  
    }

	ngOnDestroy(): void { }
	
}
