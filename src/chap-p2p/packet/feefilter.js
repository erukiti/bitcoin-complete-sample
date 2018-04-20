const decodeFeefilter = decoder => {
  const fee = decoder.uInt64LE()
  return {
    fee
  }
}

module.exports = {
  decodeFeefilter
}
