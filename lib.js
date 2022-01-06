'use strict'

window.tag = (name, attributes = {}, ...children) => {
  const node = document.createElement(name)
  Object.keys(attributes).forEach(name => {
    node.setAttribute(name, attributes[name])
  })
  children.forEach(child => {
    if (typeof child === 'string') {
      child = document.createTextNode(child)
    }
    if (child) {
      node.appendChild(child)
    }
  })
  return node
}

window.byId = id => document.getElementById(id)
window.byCss = selector => document.querySelector(selector)
window.byCssAll = selector => [].slice.call(document.querySelectorAll(selector))

const head = byCss('head')
head.insertBefore(tag('link', {
  rel: 'stylesheet',
  href: document.currentScript.src.replace('/lib.js', '/styles.css')
}), head.firstChild)

document.body.insertBefore(tag('div', { id: 'forkongithub' }, tag('a', {
  href: 'https://github.com/ArnaudBuchholz/crypto-challenges',
  target: '_blank',
  rel: 'noreferrer noopener'
}, 'Fork me on GitHub')), document.body.firstChild)
