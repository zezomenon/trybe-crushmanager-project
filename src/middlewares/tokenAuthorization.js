const hasAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenSize = 16;
  const tokenDontExist = 'Token não encontrado';
  const invalidToken = 'Token inválido';
  
  if (!authorization) return res.status(401).json({ message: tokenDontExist });
  if (authorization.length < tokenSize) return res.status(401).json({ message: invalidToken });
  
  next();
};

module.exports = hasAuthorization;
