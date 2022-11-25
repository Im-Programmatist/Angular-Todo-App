import { Component, OnInit, Input } from '@angular/core';
import { ToastService } from '../../Services/toast/toast.service'; 
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  //templateUrl: './toast.component.html',
  templateUrl: './toast-sec-component.html',
  //styleUrls: ['./toast.component.css'],
  styleUrls: ['./toast-sec-component.scss'],
  animations: [
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateY(0%)' })),
      state('close', style({ transform: 'translateY(-200%)' })),
      transition('open <=> close', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {

	toastClass: string[];  
	toastMessage: string;  
	showsToast: boolean;  

	constructor(public toastService: ToastService ){			
	}

	dismiss(): void {    
		this.toastService.dismissToast();  
	}

	ngOnInit(): void {
	}
}
