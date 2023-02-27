import { Inject, Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionState } from '@microsoft/signalr/dist/esm/HubConnection';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl: string) { }

  start(hubUrl : string){

    hubUrl = this.baseSignalRUrl+hubUrl

   

      const builder:HubConnectionBuilder = new HubConnectionBuilder()

      const hubConnection : HubConnection =  builder.withUrl(hubUrl).withAutomaticReconnect().build()

      hubConnection.start()
      .then(()=> {
        console.log("Connected")
  
      })
      .catch((error)=>{
        setTimeout(()=> this.start(hubUrl), 2000)
      })

  
   

      hubConnection.onreconnected(connectionId => console.log("reconnected"))
      hubConnection.onreconnecting(error => console.log(error))
      hubConnection.onclose(error => console.log(error))

      return hubConnection
  }

  invoke(
    hubUrl : string,
    procedurName:string,
    message:any,
    successCallBack? : (value)=> void,
    errorCallBack? : (error)=>void,

  ){

    this.start(hubUrl).invoke(procedurName, message)
      .then(successCallBack)
      .catch(errorCallBack)

  }

  on(
    hubUrl : string,
    procedureName: string,
    callBack: (...message) => void
  ){

    this.start(hubUrl).on(procedureName, callBack)



  }
}
