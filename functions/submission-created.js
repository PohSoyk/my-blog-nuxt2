require('dotenv').config();
const { USER, PASSWORD } = process.env;

const nodemailer = require('nodemailer');

exports.handler = function (event, callback) {
  const { name, email, message } = JSON.parse(event.body).payload.data;

  // Auth認証情報
  const auth = {
    user: USER,
    pass: PASSWORD,
  };

  // トランスポート
  const transport = {
    pool: true,
    host: 'smtp21.gmoserver.jp',
    port: 465,
    secure: true,
    auth,
  };

  const transporter = nodemailer.createTransport(transport);

  const url = 'https://posonote.com/';

  const mailOptions = {
    from: `PoSo's Note <info@posonote.com>`,
    to: `${email}`,
    subject: `【PoSo's Note】お問い合わせありがとうございます`,
    text: `${name} 様\n\nお問い合わせありがとうございます。\n以下の内容でフォームを送信いたしました。\n数日中に追ってサイト管理者よりメールにて回答をお送りいたします。\n今しばらくお待ちください。\n\n------ 送信内容 ------\n【お名前】\n${name}\n\n【メールアドレス】\n${email}\n\n【お問い合わせ内容】\n${message}\n\n--------------------\nPoSo's Note\n${url}\n`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          info: info.massage,
          error: error.message,
        }),
      };
      callback(null, response);
      transporter.close();
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        info: info.massage,
        message: `Email processed succesfully!`,
      }),
    };
    callback(null, response);
    transporter.close();
  });
};
