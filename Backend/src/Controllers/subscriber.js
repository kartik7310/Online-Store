import Subscribe from "../Models/Subscriber.js";


async function emailSubscribe(req, res) {
  try {
    const { email } = req.body;

    // 1. Validate input
    if (!email) {
      return res.status(400).json({ message: "Please enter an email." });
    }

    // 2. Check if email already exists
    const existing = await Subscribe.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already subscribed." });
    }

    // 3. Save new subscription
    const newSubscription = new Subscribe({ email });
    await newSubscription.save();

    return res.status(201).json({
      message: "Subscribed successfully.",
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return res.status(500).json({ message: "Server error." });
  }
}

export default emailSubscribe;
