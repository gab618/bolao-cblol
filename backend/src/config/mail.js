export default {
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  default: {
    from: 'Gabriel | BolãoCBLOL <noreply@bolaocblol.com>',
  },
};
