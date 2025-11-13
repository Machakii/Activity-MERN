const User = require('../models/User');

const createSampleAdmin = async () => {
  try {
    const email = 'admin@gmail.com';
    const exists = await User.findOne({ email });
    if (exists) {
      console.log('Sample admin already exists');
      return;
    }
    const admin = new User({
      name: 'Administrator',
      email: 'admin@gmail.com',
      password: 'admin1234',
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Sample admin user created: admin@gmail.com / admin1234');
  } catch (err) {
    console.error('Could not create sample admin:', err.message);
  }
};

module.exports = createSampleAdmin;
