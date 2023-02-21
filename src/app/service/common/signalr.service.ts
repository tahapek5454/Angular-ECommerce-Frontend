import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionState } from '@microsoft/signalr/dist/esm/HubConnection';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private _connection : HubConnection

  get connection(): HubConnection{
    return this._connection
  }
  start(hubUrl : string){

    if(this._connection == null || this._connection?.state == HubConnectionState.Disconnected){

      const builder:HubConnectionBuilder = new HubConnectionBuilder()

      const hubConnection : HubConnection =  builder.withUrl(hubUrl).withAutomaticReconnect().build()

      hubConnection.start()
      .then(()=> {
        console.log("Connected")
  
      })
      .catch((error)=>{
        setTimeout(()=> this.start(hubUrl), 2000)
      })

      this._connection = hubConnection
    }

    this._connection.onreconnected(connectionId => console.log("reconnected"))
    this._connection.onreconnecting(error => console.log(error))
    this._connection.onclose(error => console.log(error))

  }

  invoke(
    procedurName:string,
    message:any,
    successCallBack? : (value)=> void,
    errorCallBack? : (error)=>void,

  ){

    this.connection.invoke(procedurName, message)
      .then(successCallBack)
      .catch(errorCallBack)

  }

  on(
    procedureName: string,
    callBack: (...message) => void
  ){

    this.connection.on(procedureName, callBack)



  }
}
