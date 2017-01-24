'use strict'

const PageHeader = x.compose('header', { className: 'page', ariaRole: "Title" })

const Title = ({ state }) => PageHeader(['h1', state.title])
