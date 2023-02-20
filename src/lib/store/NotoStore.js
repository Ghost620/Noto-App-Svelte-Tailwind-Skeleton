// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const isNotes = writable(false);

const data = browser ? (window.localStorage.getItem('user') == null ? 'false' : window.localStorage.getItem('user')) : 'false'

export const notos = writable(data)
