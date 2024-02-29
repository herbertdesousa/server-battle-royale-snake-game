import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway({ transports: ['websocket'] })
export class HelloWorldGateway {
  @SubscribeMessage('HELLO_WORLD')
  handleEvent(@MessageBody() data: string): string {
    console.log(data);

    return data;
  }
}
