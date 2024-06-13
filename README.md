# Even
Even is a desktop based tool that helps developers to build event-driven architecture.  

## Features

**Starting a web-socket server locally** - This feature helps decouple the front-end and back-end teams by enabling the front-end team to connect to Even's web-socket server and work independently, without depending on the back-end team.  

**Connecting to a web-socket server** - While Postman offers this feature, it does not support sending cookies (which are crucial for authentication before connecting to the web-socket server) or the encryption/decryption of messages which have been offered in Even.  

**Web-socket test engine** - This engine allows users to write end-to-end test cases for distributed web-socket servers.  
 
**Starting a Kafka server locally** - Installing Kafka and starting Kafka brokers, producers, and consumers can be tedious due to the lengthy commands required. With our tool, Kafka brokers, producers, and consumers can be started with just a click of a button. Additionally, it simplifies switching between different Kafka versions, and messages are displayed using a JSON viewer for better readability.  

**Schema registry** - Users can manually create schemas or have them automatically taken from AsyncAPI docs. This feature allows users to create web-socket test cases and interact with web-socket servers and Kafka seamlessly.  