export const verifyToken = (req, res, next) => {
  console.log('🔒 Dummy verifyToken middleware');
  next();
};

export const checkRole = (roles) => (req, res, next) => {
  console.log('🛡️ Dummy checkRole middleware', roles);
  next();
};
