import { Component, VERSION, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-observables',
  //templateUrl: './observables.component.html',
  template: `
	<div class="card" style="width: 90%; margin-left:20px;">
		<div class="card-body">
			<h2 class="card-title">Observables & Subscribers</h2>
			<p class="card-text">Observables used as an interface to handle asynchronous operations - </p>
			<ul>
				<li>HTTP module uses observables to handle AJAX requests and responses </li>
				<li>Router and Forms modules use observables to listen for and respond to user-input events</li>
				<li>take(2) - operator will only take 2 result values and complete the observables </li>
				<li>Observer not goes in complete block unless we mention it in observer</li>
				<li style='color:blue;'>
					A Subject or Observable doesn't have a current value. When a value is emitted, it is passed to subscribers and the Observable is done with it.
					If you want to have a current value, use BehaviorSubject which is designed for exactly that purpose.
				</li>
				<li style='color:red;'>With the complete value, the observer sends no value. With the complete value, the observer sends no value. Thats why complete has no value to pass.</li>
				<li style='color:red;'>With the error value, the observer sends a JavaScript exception. If an error is found in the Observable, nothing else can be delivered to the Observable</li>
				<li style='color:red;'>To make observables asynchronous, let us wrap timers around some of the values. so values in timer get later once timer ends then only complete method get called not before timer values.</li>
				<li style='color:blue;'>In asynchronous observer if error block written in higher timer than complete block then observer never reach to error value emerge </li>
				<li style='color:green;'>
					<h3>Unsubscribe Observables</h3>
					<ul>
						<li style='color:red;'>subscribeTimer.unsubscribe();</li>
						<li style='color:red;'>
							using async pipe - When the component gets destroyed, the async pipe unsubscribes automatically to avoid potential memory leaks. 
							use observable variable using interpolation in html part - {{observable$ | async}}	
						</li>
						<li style='color:red;'>Using take operators - subscription  will unsubscribe when the interval emits the first value.</li>
					</ul>
				</li>
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
    //styleUrls: ['./observables.component.css'],
})
export class ObservablesComponent implements OnInit {
	code_snippet = `

	syntax :
	var observable = Observable.create((observer:any) => {
		observer.next('Hello World!')
	})
	observable.subscribe(
		next: () => { console.log('Callback for success'); },
		error: () => { console.log('Callback for error'); },
		complete: () => { console.log('Callback for complete'); }
	);	
	subscribeTimer.unsubscribe();

	//OR
	obs = new Observable(observer => {
		console.log('Observable starts');
		observer.next('1');
		observer.next('2');
		observer.next('3');
		observer.next('4');
		observer.error(new Error('no!'));
		observer.next('5');
		//observer.complete();
		observer.complete();
	});
	
	this.obs
	//.pipe(take(2))
	// .pipe(
	// 	//map((val:any) =>{ return val*2 })
	// )
	.pipe(
		finalize(() => {
		// * This will always run when observable finishes the stream
		console.log("Finally!");
		// * callback for finally
		}) //this will rn on error as well as on success
	)
	.subscribe(
		val => {
		console.log(val);
		}, //next callback
		error => {
		console.log('error', error);
		}, //error callback
		() => {
		console.log('Completed 1 observable');
		} //complete callback
	).add(() => {
		console.log("Will be executed on both success or error of the previous subscription")
	})
	
	//We can add a timeout to insert a delay in each next() callback
	//To make observables asynchronous, let us wrap timers around some of the values.
	obsWithInterval = new Observable((observer) => {
		console.log("Observable with interval starts")
		observer.next(0);
		observer.next(1)
		setTimeout(() => { observer.next(2) }, 2000); 
		setTimeout(() => { observer.next(3) }, 3000);
		observer.next(4);
		setInterval(() => {
			observer.error('This is the end due to error in asynchronous observable')
		}, 9000) //this will not be executed as timer is greater than complete
		setTimeout(() => { observer.next(5) }, 5000);
		observer.next(6);
		//Due to below line observable complete immediately 
		//and all timeout runs but not get received/address by subscriber.
		//observer.complete(); 
		//to avoid such situation put complete in timeout
		setTimeout(() => { observer.complete() }, 7000);
	});
	`;
	name = 'Angular ' + VERSION.major;

	observable$;//this obs used for unsubscribe using async pipe

	obs = new Observable(observer => {
	  console.log('Normal Observable starts');
	  observer.next('1');
	  observer.next('2');
	  observer.next('3');
	  observer.next('4');
	  observer.error(new Error('no!'));
	  observer.next('5');
	  //observer.complete();
	  observer.complete();
	});

	//We can add a timeout to insert a delay in each next() callback
	//To make observables asynchronous, let us wrap timers around some of the values.
	obsWithInterval = new Observable((observer) => {
		console.log("Observable with interval starts")
		observer.next(0);
		observer.next(1)
		setTimeout(() => { observer.next(2) }, 2000); 
		setTimeout(() => { observer.next(3) }, 3000);
		observer.next(4);
		setInterval(() => {
			observer.error('This is the end due to error in asynchronous observable')
		}, 3000)
		setTimeout(() => { observer.next(5) }, 5000);
		observer.next(6);
		//Due to below line observable complete immediately 
		//and all timeout runs but not get received/address by subscriber.
		//observer.complete(); 
		//to avoid such situation put complete in timeout
		setTimeout(() => { observer.complete() }, 7000);
	});

 	constructor(){

		this.observable$ = interval(1000);

		this.obsWithInterval
		.pipe(
			//filter((val:any) => { return (val % 2 == 0); }),
		)
		this.obsWithInterval
		.subscribe( 
			(val) => {
				console.log(`value interval observable - ${val}`)
			},
			(error) => {
				console.log(`error interval observable ${error}`);
			},
			() => {
				console.log(`complete interval observable`);
			}
		);		  
	}

	ngOnInit(): void {
		this.obs
		//.pipe(take(2))
		// .pipe(
		// 	//map((val:any) =>{ return val*2 })
		// )
		.pipe(
			finalize(() => {
			  // * This will always run when observable finishes the stream
			  console.log("Finally!");
			  // * callback for finally
			}) //this will rn on error as well as on success
		)
		.subscribe(
			// next: () => { console.log(`Callback for success`); },
			// error: () => { console.log(`Callback for error`); },
			// complete: () => { console.log(`Callback for complete`); },
			val => {
			  console.log(val);
			}, //next callback
			error => {
			  console.log('error', error);
			}, //error callback
			() => {
			  console.log('Completed 1 observable');
			} //complete callback
		).add(() => {
			console.log("Will be executed on both success or error of the previous subscription")
		})
	}
}
