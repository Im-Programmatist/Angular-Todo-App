

import { Component } from '@angular/core';
import { take, map, combineAll } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-rxjs-dashboard',
  template: `
    <div class="card" style="width: 90%; margin-left:20px;">
        <img src="https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1.5,format=auto/https%3A%2F%2F3152372751-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-LwY_OXUQHvmdEoy0xNa%252Favatar.png%3Fgeneration%3D1579380746835203%26alt%3Dmedia" width="5%" heigth="auto" alt="...">
        <div class="card-body">
            <h2 class="card-title">RxJs</h2>
            <p class="card-text">The RxJS (Reactive Extensions Library for JavaScript) is a javascript library, 
            that allows us to work with asynchronous data streams.</p>
            <p> At any point in time stream may emit any of the following three things</p>
            <ul>
                <li>Value: i.e the next value in the stream</li>
                <li>Complete: The stream has ended</li>
                <li>Error: The error has stopped the stream.</li>
            </ul>
            <p>The RxJs has two main players - </p>
            <ul>
                <li>Observable - </li>
                    <li>
                        <ul>
                            <li>Observable is a function that converts the ordinary stream of data into an observable stream of data.</li>
                            <li>Observable stream or simple Observable emits the value from the stream asynchronously. It emits the complete signals when the stream completes or an error signal if the stream errors out.</li>
                            <li>The Observable on its own is useless unless someone consumes the value emitted by the observable.(for this purpose we use observers/subscribers)</li>
                        </ul>
                    </li>
                <li>Observers ( Subscribers) - </li>
                <li>
                    <ul>
                        <li>The observers communicate with the Observable using callbacks</li>
                        <li>The observer must subscribe with the observable to receive the value from the observable.</li>
                        <li>While subscribing it optionally passes the three callbacks. next(), error() & complete()</li>
                    </ul>
                </li>
            </ul>
            <!-- a href="#" class="btn btn-primary">Go somewhere</a-->
        </div>
    </div>
  `,
})
export class RxJsComponent {
    
}