import { Body, Controller, Get, Post,Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Client } from "@line/bot-sdk";
const dotenv = require("dotenv");
const env = dotenv.config().parsed;
const lineConfig = {
  channelAccessToken: env.ACCESS_TOKEN,
  channelSecretToken: env.SECRET_TOKEN,
};
const client = new Client(lineConfig);
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Post("/webhook")
  async createOrder(@Body() data) {
    const event = data.events;
    const userId = event[0].source.userId
  //  console.log(event)
 //   console.log("userId",userId)

    if (event[0].type === "message" && event[0].message.type === "text") {
      this.appService.handleMessageEvent(event,userId);
    } else {
      var echo: any = { type: 'text', text: "กรุณาส่งข้อความเป็น Text" };
      return client.replyMessage(event[0].replyToken, echo); 
    } 


  } 
  @Get("/push/:id")
  async findOne(@Param('id') order_id: number) {
    await this.appService.handleMessagePush(+order_id);
     return {status : 200}
  } 

 
}
