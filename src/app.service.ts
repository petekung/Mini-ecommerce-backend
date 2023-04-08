import { Injectable } from '@nestjs/common';
import { Client } from "@line/bot-sdk";
import { ProductService } from "../src/backendApi/product.service";
import { Order_listService } from './backendApi/order_list.service';
const dotenv = require("dotenv");
const env = dotenv.config().parsed;
const lineConfig = {
  channelAccessToken: env.ACCESS_TOKEN,
  channelSecretToken: env.SECRET_TOKEN,
};
const client = new Client(lineConfig);
@Injectable()
export class AppService {
  constructor(
    private productService: ProductService,
    private order_listService: Order_listService,



  ) { }

  async handleMessageEvent(event, userId) {
    let eventText: any = event[0].message.text.toLowerCase();
    // console.log(event)
    var axios = require('axios');
    var data = JSON.stringify({
      "userId": userId
    });

    var config = {
      method: 'post',
      url: env.USERSID,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        //   console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
          console.log(error);
      });

    // console.log("UserId",userId)
    // let product_price = num.toString(); 
    let msg: any = []
    let msg1: any = []
    if (event[0].message.type === "text") {

      msg = {
        "type": "text",
        "text": "สวัสดีครับ! สนใจเมนูไหนเลือกกดได้เลยครับ"
      }
    }

    if (eventText === "notebook" || eventText === "Notebook") {
      var text1 = "1"
      const productList = await this.productService.findCateLine(text1)

      if (productList.length !== 0) {

        const productListItem = productList.map((product) => (
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": `${process.env.NEXT_PUBLIC_BACK_URL}`+"/api/product/picture/" + product.img_product,
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": product.product_name,
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": product.product_price.toString()+ "  THB",
                      "weight": "bold",
                      "size": "xl",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
                    },
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ซื้อ",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/customerByOrder?Id=" + product.id + "&UID=" + userId
                  },
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ดูสินค้าทั้งหมด",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/see_more/product_seemore?Id=" + text1 + "&UID=" + userId
                  },
                },
              ]
            }
          }
        ))

        msg = {
          "type": "flex",
          "altText": "Flex Message",
          "contents": {
            "type": "carousel",
            "contents": productListItem
          }

        }
      } else {
        msg = {
          "type": "text",
          "text": "ไม่มีสินค้า",

        }
      }





    }
    if (eventText === "monitor" || eventText === "Monitor") {
      var text1 = "2"

      const productList = await this.productService.findCateLine(text1)

      if (productList.length !== 0) {
        const productListItem = productList.map((product) => (
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": `${process.env.NEXT_PUBLIC_BACK_URL}`+"/api/product/picture/" + product.img_product,
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": product.product_name,
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": product.product_price.toString()+ "  THB",
                      "weight": "bold",
                      "size": "xl",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
                    },
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ซื้อ",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/customerByOrder/?Id=" + product.id + "&UID=" + userId
                  },
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ดูสินค้าทั้งหมด",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/see_more/product_seemore?Id=" + text1 + "&UID=" + userId
                  },
                },
              ]
            }
          }
        ))

        msg = {
          "type": "flex",
          "altText": "Flex Message",
          "contents": {
            "type": "carousel",
            "contents": productListItem
          }

        }
      } else {
        msg = {
          "type": "text",
          "text": "ไม่มีสินค้า",

        }
      }
    }
    if (eventText === "keyboard" || eventText === "Keyboard") {
      var text1 = "3"
      const productList = await this.productService.findCateLine(text1)
      //   console.log(productList)
      if (productList.length !== 0) {

        const productListItem = productList.map((product) => (
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": `${process.env.NEXT_PUBLIC_BACK_URL}`+"/api/product/picture/" + product.img_product,
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": product.product_name,
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": product.product_price.toString()+ "  THB",
                      "weight": "bold",
                      "size": "xl",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
                    },
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ซื้อ",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/customerByOrder/?Id=" + product.id + "&UID=" + userId
                  },
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ดูสินค้าทั้งหมด",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/see_more/product_seemore?Id=" + text1 + "&UID=" + userId
                  },
                },
              ]
            }
          }
        ))

        msg = {
          "type": "flex",
          "altText": "Flex Message",
          "contents": {
            "type": "carousel",
            "contents": productListItem
          }

        }
      } else {
        msg = {
          "type": "text",
          "text": "ไม่มีสินค้า",

        }


      }

    }
    if (eventText === "mouse" || eventText === "Mouse") {
      var text1 = "4"
      const productList = await this.productService.findCateLine(text1)
      //   console.log(productList)
      if (productList.length !== 0) {


        const productListItem = productList.map((product) => (
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": `${process.env.NEXT_PUBLIC_BACK_URL}`+"/api/product/picture/" + product.img_product,
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": product.product_name,
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": product.product_price.toString()+ "  THB",
                      "weight": "bold",
                      "size": "xl",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
                    },
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ซื้อ",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/customerByOrder/?Id=" + product.id + "&UID=" + userId
                  },
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ดูสินค้าทั้งหมด",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/see_more/product_seemore?Id=" + text1 + "&UID=" + userId
                  },
                },
              ]
            }
          }
        ))

        msg = {
          "type": "flex",
          "altText": "Flex Message",
          "contents": {
            "type": "carousel",
            "contents": productListItem
          }

        }
      } else {
        msg = {
          "type": "text",
          "text": "ไม่มีสินค้า",

        }


      }

    }
    if (eventText === "printer" || eventText === "Printer") {
      var text1 = "5"
      const productList = await this.productService.findCateLine(text1)
      //   console.log(productList)
      if (productList.length !== 0) {

        const productListItem = productList.map((product) => (
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": `${process.env.NEXT_PUBLIC_BACK_URL}`+"/api/product/picture/" + product.img_product,
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": product.product_name,
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": product.product_price.toString() + "  THB",
                      "weight": "bold",
                      "size": "xl",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
                    },
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ซื้อ",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/customerByOrder/?Id=" + product.id + "&UID=" + userId
                  },
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ดูสินค้าทั้งหมด",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/see_more/product_seemore?Id=" + text1 + "&UID=" + userId
                  },
                },
              ]
            }
          }
        ))

        msg = {
          "type": "flex",
          "altText": "Flex Message",
          "contents": {
            "type": "carousel",
            "contents": productListItem
          }

        }
      } else {
        msg = {
          "type": "text",
          "text": "ไม่มีสินค้า",

        }


      }

    }
    if (eventText === "gamingchair" || eventText === "GamingChair") {
      var text1 = "6"
      const productList = await this.productService.findCateLine(text1)
      //   console.log(productList)
      if (productList.length !== 0) {

        const productListItem = productList.map((product) => (
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": `${process.env.NEXT_PUBLIC_BACK_URL}`+"/api/product/picture/" + product.img_product,
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": product.product_name,
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": product.product_price.toString() + "  THB",
                      "weight": "bold",
                      "size": "xl",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
                    },
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ซื้อ",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/customerByOrder/?Id=" + product.id + "&UID=" + userId
                  },
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ดูสินค้าทั้งหมด",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/see_more/product_seemore?Id=" + text1 + "&UID=" + userId
                  },
                },
              ]
            }
          }
        ))

        msg = {
          "type": "flex",
          "altText": "Flex Message",
          "contents": {
            "type": "carousel",
            "contents": productListItem
          }

        }
      } else {
        msg = {
          "type": "text",
          "text": "ไม่มีสินค้า",

        }


      }

    }
    if (eventText === "order" || eventText === "Order") {
      msg = {
        "altText": "ข้อความ",
        "type": "flex",
        "contents": {
          "size": "giga",
          "body": {
            "layout": "vertical",
            "contents": [
              {
                "margin": "xs",
                "text": "เลือกประเภท",
                "type": "text",
                "align": "center",
                "size": "md"
              },
              {
                "layout": "horizontal",
                "type": "box",
                "contents": [
                  {
                    "contents": [
                      {
                        "url": "https://scontent.fbkk7-3.fna.fbcdn.net/v/t1.15752-9/327143694_1308168893244839_8626561680916094157_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHL37aWhvWzlK0aO254PnbTBcOEFsPpNAcFw4QWw-k0B-Nz4FwukGpJ6FAHMjplRULU1fRAv1pNn1FUcHE3rClg&_nc_ohc=oJl9-gObajkAX9eYThs&tn=BrPQIULq9XQl-V8o&_nc_ht=scontent.fbkk7-3.fna&oh=03_AdRGo8lVzEjp_qaX-lIi2MaIPb8WaXVwrv0wt4kfg_IRhw&oe=64018348",
                        "margin": "xs",
                        "action": {
                          "text": "Keyboard",
                          "label": "action",
                          "type": "message"
                        },
                        "type": "image"
                      },
                      {
                        "type": "image",
                        "action": {
                          "type": "message",
                          "label": "action",
                          "text": "Printer"
                        },
                        "url": "https://scontent.fbkk7-3.fna.fbcdn.net/v/t1.15752-9/327284997_488781796776926_7006897486794516145_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHj3t5BoQBhgXyus4VazYXDQa4Ar0VsJDZBrgCvRWwkNikLIqaVyl3ReBSlCwz591ZKxKDUn9S1WOGDOzyWC-TQ&_nc_ohc=kz8iubY42IQAX_NrTqa&_nc_ht=scontent.fbkk7-3.fna&oh=03_AdReSbVc3u7h4jIsWkKJTlyWOyaY92vUki1JVyHJl9y3jw&oe=640188CC"
                      }
                    ],
                    "type": "box",
                    "layout": "vertical"
                  },
                  {
                    "layout": "vertical",
                    "contents": [
                      {
                        "action": {
                          "type": "message",
                          "label": "action",
                          "text": "Notebook"
                        },
                        "url": "https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.15752-9/327161659_1350041675750693_6898408209870308072_n.png?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeH2JL058vrbP99xm--P_HHRjwaW1kxZMoWPBpbWTFkyhYy9SH7RsnjGusR0CLZZLyd_TwwGJ2sUL05ahFmGvDDV&_nc_ohc=rCCgZpbGP9sAX8sGYxF&tn=BrPQIULq9XQl-V8o&_nc_ht=scontent.fbkk7-2.fna&oh=03_AdRhtSre060NzAfZA96OkJBSmMorLIXAUYaVnvh9Q4FT9Q&oe=640184F4",
                        "type": "image"
                      },
                      {
                        "url": "https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.15752-9/327309569_1342366306524278_8449620919184473129_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeE-xT6CkShCqxaLQALM-fjjWsgsUKCbfstayCxQoJt-y2iBAXt59oOlscOoA3iqSGF54tmYNA8gpY3VgoJdmTdi&_nc_ohc=9MHPdOVs80sAX8osdYA&_nc_ht=scontent.fbkk7-2.fna&oh=03_AdQu1mera5ALcf51Ryd23BM3RYTjMtNQ8wLQt3bst8BR4Q&oe=6401A693",
                        "type": "image",
                        "action": {
                          "type": "message",
                          "text": "Mouse",
                          "label": "action"
                        }
                      }
                    ],
                    "type": "box"
                  },
                  {
                    "layout": "vertical",
                    "contents": [
                      {
                        "url": "https://scontent.xx.fbcdn.net/v/t1.15752-9/326263035_687871443123987_1654727759432959742_n.png?stp=dst-png_p1080x2048&_nc_cat=106&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeGfLfSsbcyLdoEiscI5yL63yr6kxa4HqUHKvqTFrgepQZV7AuCQ-Sy8BOW2exohj7umvyJ9VpXjLOIEveyOJhet&_nc_ohc=jJgJiZJwCKMAX9WmG2T&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRGQuWGPnh3SUL8BK7d5K4Qet2MwagWfoNp4q0RBwepxw&oe=6401AEE1",
                        "action": {
                          "label": "action",
                          "text": "Monitor",
                          "type": "message"
                        },
                        "type": "image"
                      },
                      {
                        "action": {
                          "label": "action",
                          "type": "message",
                          "text": "GamingChair"
                        },
                        "url": "https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.15752-9/327148097_914422173256191_2164681666042710333_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHMmERnMXIpxht0N65K8BDBR2ZOr-JRV5ZHZk6v4lFXllrdzVQd35D5h0jWQwx8Nd3KATDgVOQ9u9fHEk0tjTt4&_nc_ohc=2imAEROCtywAX-83UlD&_nc_ht=scontent.fbkk7-2.fna&oh=03_AdS0fbmoE7rn-Hm7LOktov3RpKI4MUVbRqDjAWVn4wLLvQ&oe=640186B1",
                        "type": "image"
                      }
                    ],
                    "type": "box"
                  }
                ]
              }
            ],
            "type": "box"
          },
          "type": "bubble"
        }

      }
    }
    if (eventText === "newsandpromotion" || eventText === "NewsAndPromotion") {
      msg = {
        "type": "text",
        "text": "ยังไม่มีโปรโมชั่นใหม่ ในตอนนี้ครับ",

      }
    }
    if (eventText === "help" || eventText === "Help") {
      msg = {
        "type": "text",
        "text": "นี่คือ AI ตอบกลับข้อความอัตโนมัติ กรุณาแจ้งข้อมูลที่ต้องการติดต่อแอดมินได้เลยครับ ",

      }
    }

    try {
      return client.replyMessage(event[0].replyToken, msg);
    } catch (error) {
    }
  }
  async handleMessagePush(order_id: number) {
    const ordertList = await this.order_listService.findOne(order_id)
    let num = ordertList.total_price
    let total_price = num.toString();
  //  console.log(ordertList.userId)
    const order_list = ordertList.orderList
    let sum = 0
    for (const i of order_list) {
      //  console.log(i)
      sum += parseInt(i.quantiy)

    }
    //  console.log("sum = ", sum)
    var axios = require('axios');
    var Data = JSON.stringify({
      "to": ordertList.userId,
      "messages": [
        {
          "type": "flex",
          "altText": "กรุณาแจ้งชำระเงิน",
          "contents": {
            "type": "bubble",
            "direction": "ltr",
            "header": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "Order: #A" + order_id,
                  "contents": []
                }
              ]
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "จำนวนสินค้า:" + sum
                },
                {
                  "type": "text",
                  "text": "ยอดที่ต้องชำระทั้งหมด:" + total_price
                },
                {
                  "type": "text",
                  "text": "วันที่สั่ง:" + ordertList.timestamps.toDateString()
                },
                {
                  "type": "text",
                  "text": "เวลาที่สั่ง:" + ordertList.timestamps.toTimeString()
                },

              ]
            },
            "footer": {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "ชำระเงิน",
                    "uri": `${process.env.NEXT_PUBLIC_FRONT_URL}`+"/paymentView/?uuid=" + ordertList.uuid
                  },
                  "color": "#523dce",
                  "style": "primary"
                }
              ]
            }
          }
        }
      ]
    });

    var config = {
      method: 'post',
      url: 'https://api.line.me/v2/bot/message/push',
      headers: {
        'Authorization': 'Bearer ULKNVk1hXSqefrjCxSqTFYoGaj8728HFIFWZnWDkXPkrmQOl3+eFOm78ccqpe1qEa/ewd3rdA1nGmIp2yl6zfZa248DHMMNiXLTe2sONAIVAl8Oj7CYQlHMsXMl7N4rZxUjEBrHUuqvfQ32pJk4CSgdB04t89/1O/w1cDnyilFU=',
        'Content-Type': 'application/json'
      },
      data: Data
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        //   console.log(error);
      });

  }

}
