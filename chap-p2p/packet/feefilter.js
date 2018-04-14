const decodeFeefilter = decoder => {
  const fee = decoder.uInt64()
  return {
    fee
  }
}

module.exports = {
  decodeFeefilter
}
