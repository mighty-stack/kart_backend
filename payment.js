const axios = require("axios");
require("dotenv").config();
let PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
let PAYSTACK_BASE_URL  = process.env.PAYSTACK_BASE_URL

const headers = {
  Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  "Content-Type": "application/json",
};

// Initialize transaction
async function initializePayment({ email, amount }) {
  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      { email, amount: amount * 100 }, // Paystack expects kobo
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

// Verify transaction
async function verifyPayment(reference) {
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

module.exports = {
  initializePayment,
  verifyPayment,
};
