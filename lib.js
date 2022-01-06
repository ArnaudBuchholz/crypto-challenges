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
