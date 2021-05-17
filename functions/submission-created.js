require('dotenv').config();

const nodemailer = require('nodemailer');

exports.handler = function (event, context, callback) {
  const { name, email, message } = JSON.parse(event.body).payload.data;

  // OAuth認証情報
  const auth = {
    type: 'OAuth2',
    user: process.env.OAUTH_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  };

  // トランスポート
  const transport = {
    service: 'gmail',
    auth: auth,
  };

  let transporter = nodemailer.createTransport(transport);

  const url = 'https://posonote.com/';

  let mailOptions = {
    from: `PoSo's Note <info@posonote.com>`,
    to: `${email}`,
    subject: `【PoSo's Note】お問い合わせありがとうございます`,
    text: `${name} 様\n\nお問い合わせありがとうございます。\n以下の内容でフォームを送信いたしました。\n数日中に追ってサイト管理者よりメールにて回答をお送りいたします。\n今しばらくお待ちください。\n\n------ 送信内容 ------\n【お名前】\n${name}\n\n【メールアドレス】\n${email}\n\n【お問い合わせ内容】\n${message}\n\n--------------------\nPoSo's Note\n${url}\n`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      callback(error);
      console.log(info);
    } else {
      callback(null, {
        statusCode: 200,
        body: 'ok',
      });
    }
  });
};
