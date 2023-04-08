import { Injectable } from '@nestjs/common';
import axios from 'axios';
// const line = require("@line/bot-sdk");
import * as line from "@line/bot-sdk"
@Injectable()

export class LineService {
    [x: string]: any;
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://api.line.me/v2/bot',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

    }
    private client  = new line.Client({
        channelAccessToken: process.env.ACCESS_TOKEN,
        channelSecret:process.env.SECRET_TOKEN
    });

    private lineAccessToken = process.env.ACCESS_TOKEN;
    private baseURL = 'https://api.line.me/v2/bot';

    async createRichMenu(richMenu: any): Promise<any> {
        const response = await axios.post(`${this.baseURL}/richmenu`, richMenu, {  //สร้าง richmunu เพื่อน get id
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.lineAccessToken}`,
            },
        });

        return response.data;
    }


    // async uploadRichMenuImage(richMenuId, image) {
    // //   console.log(image)
    //     try {
    //   await this.client.setRichMenuImage(richMenuId, image);
    //         //   const response = await this.instance.post(`/richmenu/${richMenuId}/content`, image, {
    //         //     headers: {
    //         //       'Content-Type': 'image/jpeg'
    //         //     },
    //         //     responseType: 'arraybuffer'
    //         //   });
    //         // console.log(response.data)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
 

    async linkRichMenuToAllUsers(richMenuId) {
        //  console.log(richMenuId)
        try {
            //   console.log(richMenuId)
            const response = await this.instance.post(`/user/all/richmenu/${richMenuId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

}
