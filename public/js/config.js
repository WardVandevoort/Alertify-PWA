turnConfig = {
     iceServers: [{
          urls: [ "stun:eu-turn7.xirsys.com" ]
     }, 
     {
          username: "JKq-6XEI9x3O8QitBhF4kdWiyXB5uRV2eRVgSYIItfsF6YXV6MvNOrpgru_fK5XJAAAAAGB4lntXYXJkVmFuZGV2b29ydA==",
          credential: "5192b112-9e22-11eb-8429-0242ac140004",
          urls: [
              "turn:eu-turn7.xirsys.com:80?transport=udp",
              "turn:eu-turn7.xirsys.com:3478?transport=udp",
              "turn:eu-turn7.xirsys.com:80?transport=tcp",
              "turn:eu-turn7.xirsys.com:3478?transport=tcp",
              "turns:eu-turn7.xirsys.com:443?transport=tcp",
              "turns:eu-turn7.xirsys.com:5349?transport=tcp"
          ]
     }]
              
}