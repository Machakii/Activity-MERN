const User = require('../models/User');

const createSampleAdmin = async () => {
  try {
    const email = 'admin@demo.com';
    const exists = await User.findOne({ email });
    if (exists) {
      console.log('Sample admin already exists');
      return;
    }
    const admin = new User({
      name: 'Sample Admin',
      email: 'admin@demo.com',
      password: 'admin1234',
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Sample admin user created: admin@demo.com / admin1234');
  } catch (err) {
    console.error('Could not create sample admin:', err.message);
  }
};

module.exports = createSampleAdmin;
