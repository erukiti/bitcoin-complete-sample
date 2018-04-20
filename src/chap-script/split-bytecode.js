const assert = require('assert')

/**
 * バイトコードをオペコードとスタックに積まれるデータに分離する
 * @param {Buffer} buf
 * @returns {Array<number|Buffer>} 整数かBufferオブジェクトのどちらかが入った配列。整数ならそれはオペコード
 */
const splitBytecode = buf => {
  assert(buf instanceof Buffer)
  const result = []
  let offset = 0
  while (offset < buf.length) {
    const opCode = buf.readUInt8(offset)
    offset++
    if (opCode === 0x00 || opCode >= 0x4f) {
      result.push(opCode)
      continue
    }
    switch (opCode) {
      case 0x4c: {
        const len = buf.readUInt8(offset)
        offset++
        result.push(buf.slice(offset, offset + len))
        offset += len
        break
      }
      case 0x4d: {
        const len = buf.readUInt16LE(offset)
        offset += 2
        result.push(buf.slice(offset, offset + len))
        offset += len
        break
      }
      case 0x4e: {
        const len = buf.readUInt32LE(offset)
        offset += 4
        result.push(buf.slice(offset, offset + len))
        offset += len
        break
      }
      default: {
        const len = opCode
        result.push(buf.slice(offset, offset + len))
        offset += len
        break
      }
    }
  }
  return result
}

module.exports = {
  splitBytecode
}
