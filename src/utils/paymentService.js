export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const initializePayment = async ({
  amount,
  currency = "INR",
  receipt = "receipt_" + Date.now(),
  user = { name: "User", email: "user@example.com", contact: "9999999999" },
  onSuccess,
  onFailure
}) => {
  try {
    const isScriptLoaded = await loadRazorpayScript();
    
    if (!isScriptLoaded) {
      console.error("Razorpay SDK failed to load. Are you online?");
      if (onFailure) onFailure(new Error("Razorpay SDK failed to load."));
      return;
    }

    // Create the order on the backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency, receipt })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to create order");
    }

    const { order_id, amount: orderAmount, currency: orderCurrency, key_id } = data;

    const options = {
      key: key_id,
      amount: orderAmount.toString(),
      currency: orderCurrency,
      name: "Jewelry Store",
      description: "Test Transaction",
      image: "https://example.com/your_logo", // Optional logo URL
      order_id: order_id,
      handler: async function (response) {
        try {
          // Verify signature on backend
          const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            })
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok && verifyData.success) {
            if (onSuccess) onSuccess(verifyData);
          } else {
            throw new Error(verifyData.message || "Payment verification failed");
          }
        } catch (error) {
          console.error("Verification error:", error);
          if (onFailure) onFailure(error);
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.contact
      },
      theme: {
        color: "#D4AF37" // Gold theme
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      console.error("Payment Failed", response.error);
      if (onFailure) onFailure(response.error);
    });
    
    paymentObject.open();

  } catch (error) {
    console.error("Initialization error:", error);
    if (onFailure) onFailure(error);
  }
};
