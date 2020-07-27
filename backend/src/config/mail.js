export default {
  host: process.env.EMAIL_HOST,
  port: process.env.PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  default: {
    from: 'Gabriel | BolãoCBLOL <noreply@bolaocblol.com>',
  },
};
