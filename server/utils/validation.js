var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0; // return if str is string
}

// fungsi dari trim untuk cek validasi ada spasi atau tidak

module.exports = {
    isRealString
};