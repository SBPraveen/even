# Even
Even is a desktop based tool that helps developers build web-socket servers and  event-driven architectures.  

## To run the repo  
- ```install:all``` - Installing all dependencies
- ```yarn react:build && yarn elctron:start```  - Start the application  
  
## Features

**Starting a web-socket server locally** - This feature helps decouple the front-end and back-end teams by enabling the front-end team to connect to Even's web-socket server if the organization doesn't have one. If they have their own web-socket server, Even will act as a proxy server, allowing developers to send messages to the front-end that are not sent by the server. This is useful when building new features.

**Connecting to a web-socket server** - While Postman offers this feature, it does not support sending cookies (which are crucial for authentication before connecting to the web-socket server) or the encryption/decryption of messages which have been offered in Even.  

**Schema registry** - Users can easily import their messages from AsyncAPI(similar to the OpenAPI Specification) docs. This feature allows users to easily interact with the frontend when using even.

TODO  

**Web-socket test engine** - This engine allows users to write end-to-end test cases for distributed web-socket servers.  
 
**Starting a Kafka server locally** - Installing Kafka and starting Kafka brokers, producers, and consumers can be tedious due to the lengthy commands required. With our tool, Kafka brokers, producers, and consumers can be started with just a click of a button. Additionally, it simplifies switching between different Kafka versions, and messages are displayed using a JSON viewer for better readability.  

## Useful Links
[Trello Board](https://trello.com/b/i6J4c5zB/even)   
[Figma](https://www.figma.com/design/5LBrVUPwEm1FduKn8iqoEf/Untitled?node-id=0-1&t=j4sfY7di62836dZ0-1)  

