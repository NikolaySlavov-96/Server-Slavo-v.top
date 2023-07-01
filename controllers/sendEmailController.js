const { sendFromInfoEmail, sendFromNoReplyEmail } = require("../services/sendEmailService");

const registerVerification = async () => {

    const data = await sendFromInfoEmail('gogle.bg.napster@gmail.com', 'hello', 'hello');
    console.log(data, 'controller');
}


module.exports = {
    registerVerification,
}