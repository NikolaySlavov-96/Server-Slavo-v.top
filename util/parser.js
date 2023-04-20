function parserError(err) {
    return err.message.split('\n');
}

module.exports = { parserError }