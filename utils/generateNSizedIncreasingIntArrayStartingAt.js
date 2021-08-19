const generateNSizedIncreasingIntArrayStartingAt = (n, start = -1) => {
	let arr = [];
	for (i = start; i < n + start; i++) {
		arr.push(i);
	}
	return arr;
}

module.exports = generateNSizedIncreasingIntArrayStartingAt;