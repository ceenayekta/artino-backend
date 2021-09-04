const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAdmin = async (body) => {
  try {
    const { username, password } = body;
    if (!username) return { statusCode: 400, result: 'Username field can not be empty.' };
    if (!password) return { statusCode: 400, result: 'Password field can not be empty.' };
    const admin = await Admin.findOne({ username });
    if (!admin) return { statusCode: 400, result: 'Entered username is wrong' };

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return { statusCode: 400, result: 'The password is wrong' };

    const token = jwt.sign({ _id: admin._id }, 'thisIsTheseCondParaMetERthatDoeSNOtmaKeSeNSe', { expiresIn: '1h' });
    return { statusCode: 200, result: token };

  } catch (error) {
    throw error;
  }
}

const signupAdmin = async (body) => {
  try {
    const { username, password } = body;
    if (!username) return { statusCode: 400, result: 'Please choose a username.' };
    if (!password) return { statusCode: 400, result: 'Choose your password' };

    const admin = await Admin.findOne({ username });
    if (admin) return { statusCode: 400, result: 'نام کاربری قبلا استفاده شده است.' };

    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
    let newAdmin = new Admin({
      username,
      password: hashedPassword,
    })

    newAdmin = await newAdmin.save();
    return { statusCode: 200, result: newAdmin };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  loginAdmin,
  signupAdmin,
}