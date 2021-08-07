export default async (req, res) => {
  return res.status(200).json({
    resultMessage: 'success',
    resultCode: '00089',
    data: 'hello world!'
  })
}
