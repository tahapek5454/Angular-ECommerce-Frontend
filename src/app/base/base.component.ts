import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {

  constructor(private spinner : NgxSpinnerService){}


  showSpinner(name: SpinnerType){
    this.spinner.show(name)

    setTimeout(() => this.hideSpinner(name), 1500)
  }

  hideSpinner(name: SpinnerType){
    this.spinner.hide(name)
  }

}

export enum SpinnerType{
  Square = "s1",
  BallScale = "s2",
  BallAtom = "s3",
  BallSpin = "s4"
}
