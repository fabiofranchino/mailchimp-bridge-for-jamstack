const axios = require('axios')

const MAILCHIMP_PASS = '<YOUR-TOKEN>'
const MAILCHIMP_URL = 'us17.api.mailchimp.com/3.0/lists/<YOUR-LIST-ID>/members'

const pass = MAILCHIMP_PASS
const url = MAILCHIMP_URL

var mailchimpUrl = `https://user:${pass}@${url}`

module.exports = function (context, cb) {
  var email = context.query.e

  // "pending" sends a confirmation email; "subscribed" signs up immediately
  var json = { email_address: email, status: 'subscribed' }

  axios({
    method: 'post',
    url: mailchimpUrl,
    data: json
  }).then(response => {
    if (response.status !== 200) {
      cb({ code: response.status })
    } else {
      cb(null, { code: response.status, message: 'subscribed' })
    }
  }).catch(err => {
    cb({ code: err.response.status, message: err.response.data.title })
  })
}
