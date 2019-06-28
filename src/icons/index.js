import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)

const all = req => req.keys().map(req)
all(req)
