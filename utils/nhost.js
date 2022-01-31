import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  backendUrl: 'https://rrjrwfiboowkfppmtqbb.nhost.run'
})


export { nhost };