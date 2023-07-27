const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
client.on('qr', (qr) => {
  // Generate and scan this code with your phone
  qrcode.generate(qr, { small: true });
});
client.on('ready', (ready) => {
  console.log("Client Ready!");
});

client.on('message', message => {
  console.log(message.body);
  console.log(message.from);

  if (message.body !== null) {
    const regex = /type:\s*([^\n]+)\s*\nphoneNo:\s*([^\n]+)\s*\nmessage:\s*([^\n]+)\s*\nrepeate:\s*([^\n]+)/;

    // Extract the values using regular expression match
    const matches = message.body.match(regex);

    if (matches) {
      type = matches[1].trim();
      phoneNo = matches[2].trim();
      userMessage = matches[3].trim();
      repeate = parseInt(matches[4].trim(), 10); // Convert the repeate value to an integer

      const result = { type, phoneNo, userMessage, repeate };
      console.log(result);

      if (type === "Bomb") {
        number = result["phoneNo"]; // Replace with your own number
        message = result["userMessage"];
        for (let i = 0; i < repeate; i++) {
          client.sendMessage(number + "@c.us", message);
        }
      }
    } else {
      console.log("Data string format is invalid.");
    }
  }
});

client.initialize();
