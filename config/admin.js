module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ec5782be949d722abb772c13fb28edf7'),
  },
});
