import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  // backendUrl: 'https://qqweqquwuvwnevjkiysi.nhost.run'
  backendUrl: 'http://localhost:1337',
})

export { nhost };