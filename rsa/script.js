byId('decode').addEventListener('click', () => {
  const {d, N} = refresh()
  const C = readNumbers('C')
  const M = C.map(c => Number(pow(c, d) % BigInt(N)))
  if (byId('asText').checked) {
    writeTextMessage(M)
  } else {
  	set('M', M.join(' '))
  }
})

byId('encode').addEventListener('click', () => {
  const {e, N} = refresh()
  let M
  if (byId('asText').checked) {
    M = readTextMessage()
  } else {
    M = readNumbers('M')
  }
  const C = M.map(m => Number(pow(m, e) % BigInt(N)))
	set('C', C.join(' '))
})

byId('N').addEventListener('change', refresh)
byId('e').addEventListener('change', refresh)
byId('asText').addEventListener('click', function () {
  if (this.checked) {
    writeTextMessage(readNumbers('M'))
  } else {
    set('M', readTextMessage().join(' '))
  }
})

const get = id => byId(id).value
const getNumber = id => parseInt(get(id), 10)

function set (id, value) {
  document.getElementById(id).value = value
}

function setState (id, error, message) {
  const control = byId(id)
  const classList = control.classList
  if (error) {
    classList.add('error')
    control.title = `\u26a0\ufe0f ${message}`
  } else {
    classList.remove('error')
    control.title = ''
  }
}

function refresh () {
  const N = get('N')
  set('Nro', N)
  const [P, Q, ...others] = prime(N)
  set('P', P)
  set('Q', Q)
  const invalidPrimes = others.length || !Q
  setState('N', invalidPrimes, 'Invalid prime number combination')
  const phiN = (P - 1) * (Q - 1)
  set('phiN', phiN)
  const e = getNumber('e')
  setState('e', !(1 < e && e < phiN), '1 < e < \ud835\udedfN')
  let d
  for (d = 1; d < phiN; ++d) {
    if ((d * e) % phiN === 1) {
      break
    }
  }
  set('d', d)
  return {d, e, N}
}

const readNumbers = id => get(id).split(' ').map(s => parseInt(s, 10))
const readTextMessage = () => get('M').split('').map(m => m.charCodeAt(0))
const writeTextMessage = M => set('M', M.map(m => String.fromCharCode(m)).join(''))

function prime (number) {
  function isPrime (candidate) {
    for (let i = 2; i <= Math.sqrt(candidate); ++i) {
      if (candidate % i === 0) return false
    }
    return true
  }
  const result = []
  for (let i = 2; i <= number; ++i)  {
    while (isPrime(i) && number % i === 0) {
      result.push(i)
      number /= i
    }
  }
  return result
}

function pow (int, e) {
  const bigint = BigInt(int)
  let result = BigInt(1)
  while (e) {
    result = result * bigint
    --e
  }
  return result
}
