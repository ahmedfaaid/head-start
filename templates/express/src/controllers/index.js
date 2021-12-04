const hello = async (req, res) => {
  res.status(200).json({
    message: 'Hello!',
  });
};

export { hello };
