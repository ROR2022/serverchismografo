import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    //throw new Error('Method not implemented.');
  }
  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
    //throw new Error('Method not implemented.');
  }

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    console.log("createChatDto:..",createChatDto);
    const objResponse = {
      message: createChatDto.message,
      username: createChatDto.username,
      date: createChatDto.date
    }
    this.server.emit('newChat', objResponse);
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
