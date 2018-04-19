const {hoge, fuga} = require('./hoge')

it('hoge', () => {
	expect(hoge(1, 2)).toEqual(3) // 正しく修正した
})

it('fuga', () => {
	expect(fuga(1, 2)).toEqual([1, 2])
})
