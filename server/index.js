const express = require('express');
const multer = require('multer');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const upload = multer({ dest: path.join(__dirname, 'uploads/') });
const app = express();
app.use(cors());
app.use(express.json());

// Environment config
const SMTP_USER = process.env.SMTP_USER || 'hamza.work.omega+tscustom@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || ''; // use app password for Gmail
const PORT = process.env.PORT || 3001;

if (!fs.existsSync(path.join(__dirname, 'uploads'))){
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

app.post('/send', upload.any(), async (req, res) => {
  try {
    const { body, files } = req;
    const recipient = body.recipient || SMTP_USER;
    const type = body.type || 'message';

    let subject = `${type === 'quote' ? 'New Quote Request' : 'New Contact Message'}`;
    if (body.subject) subject += `: ${body.subject}`;

    let html = `<h3>${subject}</h3><ul>`;
    Object.keys(body).forEach(k => {
      if (['recipient','type'].includes(k)) return;
      html += `<li><strong>${k}:</strong> ${Array.isArray(body[k])?body[k]:body[k]}</li>`;
    });
    html += `</ul>`;

    const mailOptions = {
      from: SMTP_USER,
      to: recipient,
      subject,
      html,
      attachments: []
    };

    if (files && files.length) {
      files.forEach(file => {
        mailOptions.attachments.push({ filename: file.originalname || file.filename, path: file.path });
      });
    }

    await transporter.sendMail(mailOptions);

    // cleanup uploaded files
    if (files && files.length) {
      files.forEach(file => fs.unlink(file.path, () => {}));
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => console.log('Email server listening on', PORT));
