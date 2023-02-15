<script lang="ts">
	import AddTodoSection from "../lib/components/todos/AddTodoSection.svelte";
	import TodoSection from '../lib/components/todos/TodoSection.svelte';
	import ProgressSection from '../lib/components/progress/ProgressSection.svelte';

    let isNotes = false;

    import type { PageData } from './$types'
	export let data: PageData
	$: ({ articles } = data)
    
</script>

<div class="bg-slate-400 selection:bg-green-300 md:p-24 md:px-8">
    <main class="mx-auto min-h-screen w-full rounded-none bg-slate-200 px-5 py-10 outline-none md:min-h-screen max-h-screen md:w-10/12 md:rounded-2xl md:px-8 md:outline md:outline-4 md:outline-offset-8 md:outline-slate-200">

        <div class="flex space-x-4 max-h-screen">

            <div class="w-1/2 space-y-6 mt-4">

                <div class="flex flex-col space-y-5 h-[90%] p-2 overflow-y-scroll">
                    {#each articles as article}
                        <article class="py-3 px-2 bg-slate-300 outline rounded">
                            <header class="uppercase font-bold bg-slate-400 -mx-2 px-3 py-2 -mt-3">{article.title}</header>
                            <p class="font-semibold px-3 py-4">
                                {article.content}
                            </p>
                            <div class="flex -space-x-12 justify-evenly w-full">
                                <a href="/{article.id}" role="button" class="bg-teal-600 hover:bg-teal-700 text-white rounded-md w-20 h-8 text-center py-1">Edit</a>
                                <form action="?/deleteArticle&id={article.id}" method="POST">
                                    <button type="submit" class="bg-red-600 hover:bg-red-700 text-white rounded-md w-20 h-8 text-center">Delete</button>
                                </form>
                            </div>
                        </article>
                    {/each}
                </div>

            </div>

            <form class="w-1/2 flex flex-col space-y-8 items-center" action="?/createArticle" method="POST">

                <div class="flex items-center justify-evenly pt-5 pb-10 space-x-8">
                    <span class="flex-start font-bold text-gray-900 text-2xl">Notes</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" bind:checked={isNotes} value="" class="sr-only peer">
                        <div class="w-11 h-6 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                    </label>
                    <span class="flex-end font-bold text-gray-900 text-2xl"> ToDo </span>
                </div>

                {#if isNotes}
                    <textarea class="w-full" id="content" name="content" placeholder="Leave a NoTo..." rows={10} />

                    <ul class="items-center w-full text-sm font-medium bg-white border border-gray-200 rounded-lg sm:flex dark:bg-slate-500 dark:border-gray-600 text-white">
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center pl-5">
                                <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500">
                                <label for="horizontal-list-radio-license" class="w-full py-3 ml-2 text-sm font-medium text-white">Not Started </label>
                            </div>
                        </li>
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center pl-5">
                                <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500">
                                <label for="horizontal-list-radio-millitary" class="w-full py-3 ml-2 text-sm font-medium text-white">In Progress</label>
                            </div>
                        </li>
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center pl-5">
                                <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500">
                                <label for="horizontal-list-radio-passport" class="w-full py-3 ml-2 text-sm font-medium text-white">Complete</label>
                            </div>
                        </li>
                        <li class="w-full">
                            <div class="flex items-center pl-5 ml-6">
                                <button class="relative flex z-10 p-2 focus:outline-none focus:border-blue-400">
                                    <span class="flex items-center pr-4 mt-1 text-white">Share</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-5 w-6 my-1 text-blue-700">
                                      <path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z">
                                      </path>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    </ul>

                    <button class="bg-cyan-500 text-white font-bold hover:bg-cyan-700 text-lg w-1/2 py-2" type="submit">POST</button>
                {:else}
                    <textarea class="w-full" id="content" name="content" placeholder="Leave a NoTo..." rows={10} />
                    <label class="w-full text-slate-200" for="">e</label>
                    <button class="bg-cyan-500 text-white font-bold hover:bg-cyan-700 text-lg w-1/2 py-2" type="submit">POST</button>
                {/if}

            </form>
        </div>
    </main>
</div>>