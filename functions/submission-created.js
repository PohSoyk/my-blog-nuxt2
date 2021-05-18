require('dotenv').config();
const {
  OAUTH_USER,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
} = process.env;

const nodemailer = require('nodemailer');

exports.handler = function (event, context, callback) {
  const { name, email, message } = JSON.parse(event.body).payload.data;

  // OAuth認証情報
  const auth = {
    type: 'OAuth2',
    user: OAUTH_USER,
    clientId: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    refreshToken: OAUTH_REFRESH_TOKEN,
  };

  // トランスポート
  const transport = {
    service: 'gmail',
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
      callback(error);
      console.log(info); // eslint-disable-line no-console
    } else {
      callback(null, {
        statusCode: 200,
        body: 'ok',
      });
    }
  });
};
