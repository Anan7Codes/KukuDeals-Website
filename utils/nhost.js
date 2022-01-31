import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  backendUrl: 'https://qqweqquwuvwnevjkiysi.nhost.run'
})

export { nhost };