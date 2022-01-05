'use strict'

const createDigit = className => tag('div', { class: `digit ${className}` },
  tag('div', { class: 'segment' }, 'a'),
  tag('div', { class: 'segment' }, 'c'),
  tag('div', { class: 'segment' }, 'f'),
  tag('div', { class: 'segment' }, 'g'),
  tag('div', { class: 'segment' }, 'e'),
  tag('div', { class: 'segment' }, 'b'),
  tag('div', { class: 'segment' }, 'd')
)

function shuffle (array) {
  const items = [...array]
  const shuffled = []
  while (items.length) {
    const position = Math.floor(items.length * Math.random())
    shuffled.push(items[position])
    items.splice(position, 1)
  }
  return shuffled
}

const a = 'a'.charCodeAt(0)
const digitsSegments = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg']
const debugDigits = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
const encoding = shuffle('abcdefg'.split(''))
const code = Math.floor(10000 * Math.random())
const codeDigits = code.toString().padStart(4, '0').split('').map(Number)
const userMappings = 'abcdefg'.split('')

function encodeClass (digit, mappings) {
  const segments = digitsSegments[digit].split('')
    .map(segment => encoding[segment.charCodeAt(0) -a])
  if (mappings) {
    return segments
      .map(segment => userMappings[segment.charCodeAt(0) -a])
      .join(' ')
  }
  return segments.join(' ')
}

function refresh () {
  [].slice.call(document.querySelectorAll('.digit.control'))
    .forEach((digit, index) => {
      digit.className = 'digit control ' + encodeClass(debugDigits[index], userMappings)
    });
  [].slice.call(document.querySelectorAll('.digit.code'))
    .forEach((digit, index) => {
      digit.className = 'digit code ' + encodeClass(codeDigits[index], userMappings)
    })
  document.querySelector('.initial').className = 'initial ' + userMappings.reduce((mapped, mapping, index) => {
    if (mapping) {
      mapped.push('abcdefg'[index])
    }
    return mapped
  }, []).join(' ')
  document.querySelector('.fixed').className = 'fixed ' + userMappings.join(' ')
}

function setup () {
  const initial = document.querySelector('.initial')
  const fixed = document.querySelector('.fixed')
  let index
  for (index = 0; index < 10; ++index) {
    initial.appendChild(createDigit(encodeClass(debugDigits[index])))
    fixed.appendChild(createDigit('control'))
  }
  initial.appendChild(tag('div', { class: 'separator' }))
  fixed.appendChild(tag('div', { class: 'separator' }))
  for (index = 0; index < 4; ++index) {
    initial.appendChild(createDigit(encodeClass(codeDigits[index])))
    fixed.appendChild(createDigit('code'))
  }
  const mappings = document.querySelector('.mappings')
  const row = mappings.appendChild(tag('tr'))
  'abcdefg'.split('').forEach((mapping, index) => {
    const input = tag('input', {
      id: mapping,
      type: 'text',
      maxlength: 1,
      size: 1,
      value: mapping
    })
    input.addEventListener('change', function () {
      userMappings[index] = this.value
      refresh()
    })
    row.appendChild(tag('td', {}, '⏫'))
    row.appendChild(tag('td', { style: 'color: #c00' }, mapping))
    row.appendChild(tag('td', {}, '⟺⏬'))
    row.appendChild(tag('td', {}, input))
    row.appendChild(tag('td', {}, ' '))
  })
}

function help () {
  [].slice.call(document.querySelectorAll('.digit'))
    .forEach(digit => {
      const segments = digit.dataset.segments.split('').join(' ')
      digit.appendChild(createDigit(segments))
    })
}

if (location.toString().includes('help.html')) {
  window.addEventListener('load', help)

} else {
  window.addEventListener('load', () => {
    setup()
    refresh()
  })
}
