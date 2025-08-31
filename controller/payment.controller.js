const paymentService = require("../payment");

//  Initialize Payment
initializePayment = async (req, res) => {
  try {
    const { email, amount } = req.body;
    const result = await paymentService.initializePayment({ email, amount });
    res.status(200).json({
      success: true,
      message: "Payment initialized",
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || "Payment initialization failed",
    });
  }
};

// Verify Payment
verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;
    const result = await paymentService.verifyPayment(reference);
    res.status(200).json({
      success: true,
      message: "Payment verified",
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || "Payment verification failed",
    });
  }
};

exports = module.exports = {
  initializePayment,
  verifyPayment,
};