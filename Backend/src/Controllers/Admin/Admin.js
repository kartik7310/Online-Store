import User from "../../Models/User.js";

async function getUser(req, res) {
  try {
    const user = await User.find({});
    if (!user) {
      return res.status(400).json("user not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function AddUser(req, res) {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(409)
        .json({ message: "User already exists with this email." });
    }

    const user = new User({
      email,
      password, // plain text password (⚠️ not recommended)
      name,
      role: role || "customer",
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
async function EditUser(req, res) {
  const { userId } = req.params;
  const { name, email, role } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID not provided." });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}


async function deleteUser(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID not provided." });
  }

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export{getUser,AddUser,EditUser,deleteUser}