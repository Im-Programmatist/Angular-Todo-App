import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

@Component({
	selector: 'app-subject-behaviour',
	template: `
		<h2>4 Subjects types: Subject, BehaviorSubject, ReplaySubject and AsyncSubject</h2>
		<div>
			<ul>
				<li style="color:blue;">Subject - only upcoming values. A Subject on the other hand, does not hold a value.</li>
				<li style="color:black;">BehaviorSubject - one previous value and upcoming values, A BehaviorSubject holds one value (so we actually need to initialize a default value). When it is subscribed it emits that value immediately. </li>
				<li style="color:blue;">ReplaySubject - all previous values and upcoming values</li>
				<li style="color:green;">AsyncSubject - the latest value when the stream will close</li>
				<li style="color:red;">That actually means that in Subject, the subscribers will only receive the upcoming value where as in BehaviorSubject the subscribers will receive the previous value and also upcoming value.</li>
				<li style="color:red">A BehaviorSubject emits a value after subscription, a Subject no.</li>	
				<li style="color:red">BehaviorSubject keeps in memory the last value that was emitted by the observable. A regular Subject doesn't. So we can update dynamic titles based on Behaviour Subject.</li>
			</ul>
			<br/>
				<div>
					<p *ngFor="let log of logs">{{log}}</p>
				</div>
			<br/>
			<br/>
		</div>

	`
})
export class SubjectBehaviourComponent implements OnInit, AfterViewInit {
	logs: Array<string> = [];
	subjectExmp: any;
	behaviorSubjectExmp: any;
	relaySubjectExmp: any;
	asyncSubjectExmp: any;

	constructor(){
		// 1. Subject - only value after subscribed
		this.subjectExmp = new Subject<number>();
		// 2. BehaviorSubject - only last value before subscribed and all after subscription
        // calls on initalization, mandatory to specify a value
		this.behaviorSubjectExmp = new BehaviorSubject<number>(0);
		// 3. ReplaySubject - all specified last values before subscribed and all after subscription
        // Does not call on initialization, no default value
		this.relaySubjectExmp = new ReplaySubject();
		// 4. AsyncSubject - only last values before calling complete
		this.asyncSubjectExmp = new AsyncSubject();
	}

	ngOnInit(): void {
		/*Subject*/
		//value of zero will not print as subject not use memory
		this.subjectExmp.next(0);
		this.subjectExmp.subscribe(x => console.log("Subject - The first subscription : " + x));
		this.subjectExmp.next(1);
		this.subjectExmp.next(2);
		//value of 1 & 2 will not be print for second subscription
		this.subjectExmp.subscribe(x => console.log("Subject - The second Subscription : " + x));
		this.subjectExmp.next(3);
		this.subjectExmp.complete();
		this.subjectExmp.subscribe(
			(data) => this.log('Subject =>' + data),
			(error) => this.log(error),
			() => this.log('Complete Subject')
		);

		/*Behavior Subject*/		
		//value of 0.1 will be print as it is just before subscription 
		//& value of zero will not as behavior only print just 1 value before subscription
		this.behaviorSubjectExmp.next(0);
		this.behaviorSubjectExmp.next(0.1);
		this.behaviorSubjectExmp.subscribe((x) => console.log('BehaviorSubject - The first Subscription : ' + x));
		this.behaviorSubjectExmp.next(1);
		this.behaviorSubjectExmp.next(2);//this 2 will be print for second subscription as well
		this.behaviorSubjectExmp.subscribe((x) => console.log('BehaviorSubject - The second Subscription : ' + x));
		this.behaviorSubjectExmp.next(3); //for both first and second subscription
		this.behaviorSubjectExmp.complete();
		this.behaviorSubjectExmp.subscribe(
			(data) => this.log('Behavior Subject =>' + data),
			(error) => this.log(error),
			() => this.log('Complete Behavior Subject')
		);
	}

	ngAfterViewInit(): void {

		/*Relay Subject*/
		//All these value before subscription are emitted and printed to console
		this.relaySubjectExmp.next(1); 
		this.relaySubjectExmp.next(2); 
		this.relaySubjectExmp.next(3);
		this.relaySubjectExmp.subscribe(val => console.log('From ReplaySubject', val)); // this will emit all values
		this.relaySubjectExmp.next(4); 
		this.relaySubjectExmp.next(5); 
		this.relaySubjectExmp.next(6);
		this.relaySubjectExmp.complete();
		this.relaySubjectExmp.subscribe(
			(data) => this.log('Replay =>' + data),
			(error) => this.log(error),
			() => this.log('Complete Replay Subject')
		);

		/*Async Subject*/
		//print only last value emitted
		this.asyncSubjectExmp.next(1);
		this.asyncSubjectExmp.next(2);
		this.asyncSubjectExmp.next(3);
		this.asyncSubjectExmp.next(4);
		this.asyncSubjectExmp.complete();
		this.asyncSubjectExmp.subscribe(
			(data) => this.log('Async Subject =>' + data),
			(error) => this.log(error),
			() => this.log('Complete Async Subject')
		);
	}

	private log(message) {
		this.logs.push(message);
	}
}
